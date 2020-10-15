<template>
  <div
    role="group"
    class="fieldset"
  >
    <BaseInput
      :value="value._value ? value._value : null"
      :type="type"
      class="input input--small fieldset--input"
      @handleForm="handleInput"
    />
    <BaseDropdown
      :unit="value._unit"
      :type="type"
      :schema="dropdownOptions"
      @handleSelect="handleSelect"
    />
  </div>
</template>
\

<script lang="ts">

import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import BaseDropdown from '@/components/BaseElements/BaseDropdown.vue';
import NumberWithUnit from '@/models/NumberWithUnit';
import Unit from '@/models/Unit';
import Dropdown from '@/models/Dropdown';

@Component({
  name: 'InputAndDropdown',
  components: {
    BaseInput,
    BaseDropdown,
  },
})

export default class InputAndDropdown extends Vue {
  @Watch('dropdownOptions', { immediate: true, deep: true })
  setInitValue(dropdown: Dropdown) {
    const firstValue: Unit = dropdown.getFirstChild(dropdown.children);
    if (firstValue && firstValue.label && !this.propHasValueFromStore) {
      this.value._unit.labelValue = firstValue.label;
      this.$emit('calculateAmountToPut');
    }
  }

  @Watch('value', { immediate: true, deep: true })
  setValue(value: NumberWithUnit) {
    const firstValue: Unit = this.dropdownOptions.getFirstChild(this.dropdownOptions.children);
    if (!value.label && firstValue && firstValue.label) {
      this.value._unit.labelValue = firstValue.label;
    }
    this.$emit('calculateAmountToPut');
  }

  @Prop({ required: false, type: Object })
  private value!: NumberWithUnit;

  @Prop({ required: true, type: Object })
  public dropdownOptions!: Dropdown;

  @Prop({ required: false, type: String })
  readonly type!: string;

  handleInput(number: number) {
    this.value.value = number;
    this.$emit('handleForm', this.value);
  }

  handleSelect(unit: Unit) {
    if (unit.label) {
      this.value.unit = unit.label;
      this.$emit('handleForm', this.value);
    }
  }

  get propHasValueFromStore() {
    return !!(this.value && this.value._unit.label);
  }
}
</script>


<style lang="postcss">

.fieldset {
  @apply flex items-center;
}

.fieldset--input {
  @apply border-r-0 rounded-r-none;
}
</style>
