<template>
  <div class="relative">
    <select
      v-model="unit"
      :class="[small ? 'select_small rounded-l-none  border-l-0' : 'select_medium']"
      v-bind="$attrs"
      class="base-select rounded cursor-pointer"
      @change="handleSelect(unit)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ option.label }}
      </option>
    </select>
    <SelectArrowSVG
      class="base-select-arrow base-select-arrow__select"
    />
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import SelectArrowSVG from '@/assets/svgs/arrowdown.svg';
import Unit from '@/models/Unit';

@Component({
  name: 'BaseSelect',
  components: {
    SelectArrowSVG,
  },
})
export default class BaseSelect extends Vue {
  @Watch('value', { immediate: true, deep: true })
  setUnitOnChange(newUnit: Unit) {
    this.unit = newUnit;
  }

  @Prop({ required: true, type: Array })
  readonly options!: Array<Unit>;

  @Prop({ required: false, type: Object })
  readonly value?: Unit

  @Prop({ required: false, type: Boolean })
  readonly small?: boolean

  @Prop({ required: false, type: String })
  readonly name!: string;

  private unit = this.value;

  get propHasValueFromStore() {
    return !!(this.value && this.value.label);
  }

  handleSelect(newUnit: Unit) {
    this.$emit('handleForm', newUnit);
  }


  created() {
    if (this.propHasValueFromStore) {
      this.$emit('handleForm', this.value);
    } else {
      this.$emit('handleForm', this.options[0]);
    }
  }
}

</script>

<style lang="postcss">
  .base-select {
    @apply
    block appearance-none w-full bg-gray-200 border-gray-300 border-2 text-gray-700
      h-8 leading-tight px-2;
  }

  .select_medium {
    @apply w-24;
  }

  .select_small {
    @apply w-16;
  }

  .base-select-arrow {
    @apply fill-current pointer-events-none absolute text-gray-700 w-5;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .base-select-arrow__select {
    right: 0;
  }

  .formulate-input {

  [data-classification="text"] {

    input {
       background: blue;
    }
  }
}
</style>
