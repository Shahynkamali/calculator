import {
  VuexModule, Module, getModule, Mutation, Action,
} from 'vuex-module-decorators';
import store from '@/store';

@Module({
  namespaced: true,
  name: 'Recipe',
  store,
  dynamic: true,
})

class RecipeModule extends VuexModule {
    private _recipe = ''

    public get recipe(): any {
      if (this.isRecipeSavedInModule) {
        return this._recipe;
      }
      return undefined;
    }

    public get isRecipeSavedInModule(): boolean {
      return !!(this._recipe.length > 0);
    }

    @Action
    public setRecipe(newRecipe: string): void {
      this.SET_RECIPE(newRecipe);
    }

    @Mutation
    private SET_RECIPE(newRecipe: string) {
      this._recipe = newRecipe;
    }
}

const RecipeStore = getModule(RecipeModule);
export default RecipeStore;
