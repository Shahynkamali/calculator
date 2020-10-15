<template>
  <div class="modal__container">
    <LogoSVG />
    <BaseText class=" mb-4">
      {{ normalText }}
      <span class="text__bold">
        {{ boldText }}
      </span>
    </BaseText>
    <BaseButton
      :class="'button button__positive'"
      type="button"
      @click="$emit('enableActiveModalState')"
    >
      <AddSVG
        class="mr-3"
      />
      Add Ingredient
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import LogoSVG from '@/assets/svgs/logo.svg';
import BaseButton from '@/components/BaseElements/BaseButton.vue';
import AddSVG from '@/assets/svgs/add.svg';
import BaseText from '@/components/BaseElements/BaseText.vue';
@Component({
  name: 'ModalEmptyState',
  components: {
    LogoSVG,
    AddSVG,
    BaseButton,
    BaseText,
  },
})
export default class ModalEmptyState extends Vue {
  @Prop({ required: false, type: String })
  readonly normalText!: string

  @Prop({ required: false, type: String })
  readonly boldText!: string
}
</script>
