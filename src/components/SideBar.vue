<template>
  <div class="float-right h-screen">
    <div class="sidebar">
      <div class="sidebar__header">
        <h4 class="sidebar__title">
          bufferfish
        </h4>
        <span class="sidebar__icon">&#10005;</span>
      </div>
      <ul class="sidebar__tabs">
        <li class="sidebar__tab sidebar__tab--active">
          calculate
        </li>
        <li class="sidebar__tab">
          analyze
        </li>
        <li class="sidebar__tab">
          visualize
        </li>
      </ul>
      <div class="sidebar__body">
        <select
          class="form-select w-full"
          placeholder="Select a calculator type"
        >
          <option>Solutions</option>
          <option>Concentrations</option>
          <option>Proteins and DNA</option>
        </select>
        <div
          v-if="isRecipeStoredInVuex"
          class="sidebar__image"
        >
          <SideBarCard
            :data="recipeFromVuex"
            :ingredients-length="recipeFromVuex ? recipeFromVuex.ingredients.length : 0"
            @toggleModalVisibility="$emit('toggleModalVisibility')"
          />
          <div
            class="recipe-row card-actions bg-gray-100 p-2
          text-gray-600 text-sm border-l-2 border-r-2 border-b-2"
          >
            <BaseButton class="font-semibold inline-flex">
              <exportSVG class=" mr-2" />
              Export as...
            </BaseButton>
            <BaseButton
              class="font-semibold inline-flex"
              @click="$emit('toggleModalVisibility')"
            >
              <editSVG class=" mr-2" />
              Edit Recipe
            </BaseButton>
          </div>
        </div>
        <div
          v-else
          class="sidebar__image"
          @click="$emit('toggleModalVisibility')"
        >
          <CalculatorSVG />
          <p class=" font-inter text-lg text-center mt-12 mb-2">
            Lets Calculate
          </p>
          <BaseButton
            class="button button__positive  pl-12 pr-12 font-semibold"
            type="button"
          >
            Create
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CalculatorSVG from '@/assets/svgs/calculator.svg';
import SideBarCard from '@/components/SideBarCard.vue';
import BaseButton from '@/components/BaseElements/BaseButton.vue';
import exportSVG from '@/assets/svgs/export.svg';
import editSVG from '@/assets/svgs/edit.svg';
import RecipeStore from '@/store/modules/recipe';
import Recipe from '@/models/Recipe';

@Component({
  name: 'SideBar',
  components: {
    CalculatorSVG,
    SideBarCard,
    exportSVG,
    editSVG,
    BaseButton,
  },
})

export default class SideBar extends Vue {
  private get isRecipeStoredInVuex(): boolean {
    return RecipeStore.isRecipeSavedInModule;
  }

  public get recipeFromVuex(): Recipe | undefined {
    if (RecipeStore.isRecipeSavedInModule) {
      return Recipe.deserialize(RecipeStore.recipe);
    }
    return undefined;
  }
}

</script>

<style lang="postcss">

.sidebar {
  @apply w-sidebarWidth h-full shadow-lg font-inter capitalize;
}

  .sidebar__header {
    @apply flex items-center justify-between px-3 bg-gray-700 text-gray-100;
  }

  .sidebar__title {
    @apply py-3 text-sm
  }

  .sidebar__tabs {
    @apply flex mt-1 border-b;
  }

  .sidebar__tab {
    @apply
    inline-flex mr-1 py-2 px-3 bg-white rounded-t
    font-semibold text-gray-700 cursor-pointer font-normal;
  }

  .sidebar__tab--active {
    @apply -mb-px font-medium border-l border-t border-r;
  }

  .sidebar__body {
    @apply p-5 relative;
    height: calc(100% - 90px);
  }

  .sidebar__image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
  }

  .card-actions{
    border-left: 2px solid #CBD5E0;
    border-right: 2px solid #CBD5E0;
    border-bottom: 2px solid #CBD5E0;
  }

</style>
