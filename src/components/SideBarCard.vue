<template>
  <div
    v-if="data"
    class="recipe-card"
  >
    <div class="recipe-card__wrapper">
      <h2 class="recipe-row text-xl justify-center mb-8">
        <fileSVG class="mr-6" />
        Storage Buffer
      </h2>
      <div
        v-if="data._desiredVolume"
        class="recipe-row mb-6"
      >
        <BaseLabel :label="'desired volume'" />
        <InputAndLabel
          class="recipe-row"
          :readonly="true"
          :value="data._desiredVolume"
        />
      </div>
      <div class="recipe-row justify-between mb-3">
        <h6 class=" text-gray-900 text-sm capitalize font-medium">
          ingredients
        </h6>
        <h6 class=" text-gray-900 text-sm capitalize font-medium">
          Amount
        </h6>
      </div>

      <CardList
        v-for="(ingredient, index) in data.ingredients"
        :key="index"
        :class="[ingredientsLength > 3
          ? 'ingredients-wrapper-scoll'
          : null]"
        :list="ingredient"
      />

      <div
        v-if="data._solventAmount"
        class="recipe-row mt-5"
      >
        <ListItem :item="data._solventName" />
        <ListItem :item="data._solventAmount" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import BaseLabel from '@/components/BaseElements/BaseLabel.vue';
import InputAndLabel from '@/components/BaseElements/InputAndLabel.vue';
import CardList from '@/components/CardList.vue';
import ListItem from '@/components/ListItem.vue';
import fileSVG from '@/assets/svgs/file.svg';
import Recipe from '../models/Recipe';

@Component({
  name: 'SideBarCard',
  components: {
    BaseLabel,
    CardList,
    fileSVG,
    ListItem,
    InputAndLabel,
  },

})

export default class SideBarCard extends Vue {
    @Prop({ required: true, type: Object })
    readonly data?: Recipe;

    @Prop({ required: false, type: Number })
    readonly ingredientsLength?: number;
}

</script>

<style lang="scss">
.recipe-card {
    border: 2px solid #CBD5E0;
    width: 285px;
}

.recipe-card__wrapper {
    padding: 1.5rem 0.8rem;
}


.ingredients-wrapper-scoll {
    max-height: 180px;
    overflow: scroll;
    overflow-x: hidden;
}

.recipe-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
