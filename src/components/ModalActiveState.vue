<template>
  <div>
    <div class="modal__row modal__row--spaced-between mb-12">
      <BaseInput
        :class="'input input--large'"
        :value="data._recipeName"
        :type="'text'"
        placeholder="Recipe Name"
        @handleForm="setRecipeName"
      />
      <BaseButton
        :class="'button button__positive'"
        type="button"
        @click="addNewIngredient"
      >
        <AddSVG
          class="mr-3"
        />
        Add Ingredient
      </BaseButton>
    </div>
    <div class="mb-4 flex justify-start items-center">
      <BaseLabel
        v-for="(label, index) in LABELS"
        :key="index"
        :class="[
          index === 0 ? 'label__text label__text--uppercase mr-labelMargin' : 'label__text label__text--uppercase',
          index === 2 ? 'mr-10' : null,
          index === 3 ? 'mr-10' : null,
        ]"
        :label="label"
      />
    </div>
    <div class="modal__ingredient-container">
      <TheIngredient
        v-for="(ingredient, index) in data.ingredients"
        :key="ingredient.id"
        v-model="data.ingredients[index]"
        class="modal__row modal__row--spaced-between mb-5"
        :index="index"
        @removeIngredient="removeIngredient"
        @calculateSolvent="calculateSolvent"
        @handleIngredientErrors="handleIngredientErrors"
      />
    </div>
    <div class="modal__row modal__row--spaced-between modal__row--modified-width mb-5">
      <BaseInput
        :class="'input input--medium'"
        :value="data._solventName"
        :type="'text'"
        placeholder="Solvent"
        @handleForm="setSolventName"
      />
      <InputAndLabel
        :readonly="true"
        :value="data._solventAmount"
      />
    </div>
    <div class="modal__row modal__row--spaced-between modal__row--modified-width">
      <span>
        Your solution contains {{ data.numberOfIngredients }} {{ data.ingredientsString }}
      </span>
      <div class="fieldset">
        <BaseLabel
          :class="'label__text label__text--uppercase mr-3'"
          label="desired volume"
        />
        <InputAndSelect
          :class="'fieldset'"
          :value="data._desiredVolume"
          :options="LIQUIDVOLUMEUNITS"
          @handleForm="setDesiredVolume"
        />
      </div>
    </div>
    <BaseError
      v-if="errors.length"
      :error="errors[0]"
    />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import TheIngredient from '@/components/TheIngredient.vue';
import BaseButton from '@/components/BaseElements/BaseButton.vue';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import BaseLabel from '@/components/BaseElements/BaseLabel.vue';
import InputAndSelect from '@/components/BaseElements/InputAndSelect.vue';
import InputAndLabel from '@/components/BaseElements/InputAndLabel.vue';
import AddSVG from '@/assets/svgs/add.svg';
import { labelsSchema, volumeLiquidUnits } from '@/schema';
import BaseError from '@/components/BaseElements/BaseError.vue';
import Ingredient from '@/models/Ingredient';
import NumberWithUnit from '@/models/NumberWithUnit';
import Recipe from '../models/Recipe';


@Component({
  name: 'ModalActiveState',
  components: {
    TheIngredient,
    BaseButton,
    BaseInput,
    BaseLabel,
    InputAndSelect,
    AddSVG,
    InputAndLabel,
    BaseError,
  },
})
export default class ModalActiveState extends Vue {
    @Prop({ required: true, type: Object })
    public data!: Recipe;

    readonly LABELS: Array<string> = labelsSchema;

    private LIQUIDVOLUMEUNITS: Array<object> = volumeLiquidUnits;

    private errors: string[] = this.data.errors;

    private setRecipeName(name: string): void {
      this.data.recipeName = name;
    }

    private setSolventName(name: string): void {
      this.data.solventName = name;
    }

    private setDesiredVolume(newDesiredVolume: NumberWithUnit): void {
      this.data.desiredVolume = newDesiredVolume;
    }

    private addNewIngredient(): void {
      this.data.addIngredient(new Ingredient());
    }

    private removeIngredient(index: number): void {
      this.data.removeIngredient(index);
    }

    public calculateSolvent() {
      this.data.calculateSolventValueAndUnit();
    }

    private handleIngredientErrors(listOfErrors: string[]) {
      if (listOfErrors.length) {
        this.errors.unshift(listOfErrors[0]);
      } else {
        this.clearErrors();
      }
    }

    private clearErrors() {
      while (this.errors.length > 0) {
        this.errors.pop();
      }
    }
}

</script>
