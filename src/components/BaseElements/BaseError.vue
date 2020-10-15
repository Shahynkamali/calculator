<template>
  <p class="error">
    <span class=" font-bold font-inter">Hey! </span> {{ error }}
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  name: 'BaseError',
})
export default class BaseError extends Vue {
    @Prop({ required: false, type: String })
    readonly error!: string
}
</script>

<style lang="postcss">
.error {
    margin-left: 1rem;
    margin-bottom: 1rem;
    @apply absolute border-red-700 border py-3 px-4 text-red-700 bg-red-100 bottom-0 left-0;
    }
</style>
