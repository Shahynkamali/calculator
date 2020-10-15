<template>
  <ul>
    <div class="recipe-row">
      <ListItem
        :item="list._componentName"
        class="text-gray-800 font-semibold text-lg"
      />
      <ListItem
        :item="list['_amountToPut']"
        class="text-gray-800"
      />
    </div>
    <div class="recipe-row">
      <ListItem
        :item="list['_desiredConcentration']"
        class="text-gray-600"
      />
      <ListItem
        :item="list['_initConcentrationOrMolecularWeight']"
        class="text-gray-600"
      />
    </div>
  </ul>
</template>

<script lang="ts">
import Ingredient from '@/models/Ingredient';
import { Vue, Component, Prop } from 'vue-property-decorator';
import ListItem from '@/components/ListItem.vue';

@Component({
  name: 'CardList',
  components: {
    ListItem,
  },
})
export default class CardList extends Vue {
@Prop({ required: true, type: Object })
readonly list!: Ingredient
}
</script>
