/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuex from 'vuex';
import { RecipeInterface } from '@/store/modules/recipeModule';

Vue.use(Vuex);

export interface IRootState {
  recipe: RecipeInterface;
}
export default new Vuex.Store<IRootState>({});
