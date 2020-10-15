<template>
  <label
    v-bind="$attrs"
  >
    {{ labelValue }}
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({
    name: 'BaseLabel',
  })

export default class BaseLabel extends Vue {
  @Prop({ required: false, type: [Number, String] })
  readonly label?: number | string

  private get labelValue(): number | string {
    return this.label ? this.label : 0;
  }
}
</script>

<style lang="postcss">
  .label__text--uppercase {
    @apply uppercase text-xs w-32;
  }

  .label__text {
    @apply text-gray-700 leading-snug break-words font-inter break-words pt-1;
  }

</style>
