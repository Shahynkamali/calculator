<template>
  <p v-bind="$attrs">
    <slot />
  </p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'BaseText',

})
export default class BaseText extends Vue {}

</script>

<style lang="postcss">
  .text {
    @apply font-inter;
  }

  .text__large {
    @apply font-medium text-xl;
  }

  .text__inline {
    @apply inline-flex
  }

  .text__bold {
    @apply font-semibold;
  }
</style>
