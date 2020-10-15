<template>
  <button
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'BaseButton',
  inheritAttrs: false,
})
export default class BaseButton extends Vue {}
</script>


<style lang="postcss">
  .button {
    @apply font-inter py-2 px-4 flex rounded items-center text-center inline-flex;
  }

  .button__positive {
    @apply bg-green-600 text-white;
  }

</style>
