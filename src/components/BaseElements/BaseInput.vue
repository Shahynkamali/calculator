<template>
  <input
    oninput="validity.valid||(value='');"
    :step="0.01"
    :min="0"
    :value="value"
    :class="[readonly ? 'cursor-default border-r-2' : null]"
    :readonly="readonly"
    v-bind="$attrs"
    :type="type"
    @input="handleInput($event.target.value)"
  >
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import valueHasNumber from '@/utils/valueHasNumber';

@Component({
  name: 'BaseInput',
})

export default class BaseInput extends Vue {
  @Prop({ required: true, type: String })
  readonly type!: string;

  @Prop({ required: false, type: [String, Number] })
  readonly value?: string | number;

  @Prop({ required: false, type: Boolean })
  readonly readonly!: boolean;

  handleInput(value: string) {
    if (this.type === 'text') {
      this.$emit('handleForm', value.trim());
    }
    if (this.type === 'number') {
      if (valueHasNumber(value)) {
        this.$emit('handleForm', value);
      } else this.$emit('handleForm', 0);
    }
  }
}
</script>


<style lang="postcss">
  .input {
    @apply appearance-none bg-gray-200
    border-gray-300 border-2 text-gray-700 font-inter h-inputHeight px-1 rounded-l-sm;
  }

  .input--small {
    min-width: 4rem;
    @apply w-12 text-center;
  }

  .input--medium {
    @apply w-inputWidthMedium ;
  }

  .input--large {
    @apply w-inputWidthLarge;
  }

  .input--label {
    @apply bg-white border-r-0 text-center;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
    text-align: center;
  }
</style>
