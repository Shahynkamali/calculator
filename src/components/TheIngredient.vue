<template>
  <div>
    <BaseInput
      v-model="value._componentName"
      :class="'input input--medium'"
      :value="value._componentName"
      :type="'text'"
      @handleForm="handleForm('componentName', $event)"
    />
    <BaseSelect
      v-model="value._state"
      :value="value._state"
      :options="stateOptions"
      @handleForm="handleForm('state', $event)"
    />
    <InputAndDropdown
      v-model="value._initConcentrationOrMolecularWeight"
      :value="value._initConcentrationOrMolecularWeight"
      :dropdown-options="dropdownForInitConcentration"
      :type="'number'"
      @handleForm="handleForm('initConcentrationOrMolecularWeight', $event)"
      @calculateAmountToPut="calculateAmountToPut"
    />
    <InputAndDropdown
      v-model="value._desiredConcentration"
      :value="value._desiredConcentration"
      :dropdown-options="dropdownForDesiredConcentration"
      :type="'number'"
      @handleForm="handleForm('desiredConcentration', $event)"
      @calculateAmountToPut="calculateAmountToPut"
    />
    <InputAndLabel
      v-model="value._amountToPut"
      :value="value._amountToPut"
      :type="'number'"
      :readonly="true"
    />
    <BaseButton
      @click="$emit('removeIngredient', index);"
    >
      <TrashcanSVG />
    </BaseButton>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { stateOptions, children } from '@/schema';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import BaseSelect from '@/components/BaseElements/BaseSelect.vue';
import InputAndDropdown from '@/components/BaseElements/InputAndDropdown.vue';
import InputAndLabel from '@/components/BaseElements/InputAndLabel.vue';
import BaseLabel from '@/components/BaseElements/BaseLabel.vue';
import Ingredient from '@/models/Ingredient';
import BaseButton from '@/components/BaseElements/BaseButton.vue';
import TrashcanSVG from '@/assets/svgs/trashcan.svg';
import NumberWithUnit from '@/models/NumberWithUnit';
import Dropdown from '@/models/Dropdown';

@Component({
  name: 'TheIngredient',
  components: {
    BaseInput,
    BaseSelect,
    BaseLabel,
    BaseButton,
    TrashcanSVG,
    InputAndDropdown,
    InputAndLabel,
  },
})
export default class TheIngredient extends Vue {
  @Watch('value', { immediate: true, deep: true })
  watchIngredientValues(ingredient: Ingredient) {
    this.$emit('calculateSolvent');
    this.$emit('handleIngredientErrors', ingredient.errors);
  }

  @Prop({ required: true, type: Object })
  private value!: Ingredient

  @Prop({ required: true, type: Number })
  readonly index!: number

  get nodeToFilterBy() {
    return this.value._initConcentrationOrMolecularWeight._unit;
  }

  get ingredientState() {
    return this.value.state.label;
  }

  get unitsSchema() {
    return new Dropdown(children, this.ingredientState, this.nodeToFilterBy);
  }

  get dropdownForInitConcentration() {
    return new Dropdown(this.unitsSchema.childrenForInitConcentration, this.ingredientState, this.nodeToFilterBy);
  }

  get dropdownForDesiredConcentration() {
    return new Dropdown(this.unitsSchema.childrenForDesiredConcentration, this.ingredientState, this.nodeToFilterBy);
  }

  private calculateAmountToPut() {
    this.value.calculateAmountToPut();
  }

  readonly stateOptions = stateOptions;

  private handleForm(fieldName: string, value: NumberWithUnit): void {
    this.value[fieldName] = value;
  }
}
</script>
