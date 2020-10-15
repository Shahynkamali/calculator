<template>
  <form
    class="modal"
    novalidate="true"
    @submit.prevent
  >
    <BaseText
      :class="'text text__large'"
    >
      New Solution Recipe
    </BaseText>
    <ModalEmptyState
      v-if="!isModalActiveStateEnabled"
      :normal-text="'It is empty here.'"
      :bold-text="'Add your first ingredient'"
      @enableActiveModalState="enableActiveModalState"
    />
    <ModalActiveState
      v-else
      :data="recipe"
      @toggleModalVisibility="$emit('toggleModalVisibility');"
    />
    <div class="modal__actions">
      <BaseButton
        :class="'button mr-6'"
        @click="$emit('toggleModalVisibility');"
      >
        Cancel
      </BaseButton>
      <BaseButton
        :class="'button button__positive'"
        :disabled="false"
        type="submit"
        @click="handleSubmit"
      >
        Create
      </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import ModalEmptyState from '@/components/ModalEmptyState.vue';
import ModalActiveState from '@/components/ModalActiveState.vue';
import BaseButton from '@/components/BaseElements/BaseButton.vue';
import Recipe from '@/models/Recipe';
import Ingredient from '@/models/Ingredient';
import RecipeStore from '@/store/modules/recipe';
import BaseText from '@/components/BaseElements/BaseText.vue';

@Component({
  name: 'Modal',
  components: {
    ModalActiveState,
    ModalEmptyState,
    BaseButton,
    BaseText,
  },
})

export default class Modal extends Vue {
  @Watch('isRecipeStoredInVuex', { immediate: true })
  setActiveState(isRecipeStoredInVuex: boolean) {
    if (isRecipeStoredInVuex) {
      this.enableActiveModalState();
    }
  }

  public recipe = new Recipe();

  private isModalActiveStateEnabled = false;

  private get isRecipeStoredInVuex(): boolean {
    return RecipeStore.isRecipeSavedInModule;
  }

  private enableActiveModalState(): void {
    this.isModalActiveStateEnabled = true;
  }

  private handleSubmit(): void {
    this.recipe.validateRecipe(this.recipe);
    if (!this.recipe.errors.length) {
      RecipeStore.setRecipe(Recipe.serialize(this.recipe));
      this.$emit('toggleModalVisibility');
    }
  }


  created(): void {
    if (!this.recipe.ingredients.length) {
      this.recipe.addIngredient(new Ingredient());
    }
    if (this.isRecipeStoredInVuex) {
      this.recipe = Recipe.deserialize(RecipeStore.recipe);
    }
  }
}
</script>

<style lang="postcss">
  .modal {
    @apply bg-white rounded-lg w-modalWidth h-modalHeight relative p-5 m-2;
  }

  .modal__container {
    @apply flex flex-col justify-center w-full h-full items-center;
  }

  .modal__actions {
    @apply absolute bottom-0 right-0;
    padding-right: inherit;
    padding-bottom: inherit;
  }

  .modal__row {
     @apply flex w-full items-center;
  }

  .modal__row--spaced-between {
    @apply justify-between;
  }

  .modal__row--modified-width {
    @apply w-modalRowModifiedWidth;
  }

  .modal__ingredient-container {
    /* max-height: 188px;
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto; */
  }

</style>
