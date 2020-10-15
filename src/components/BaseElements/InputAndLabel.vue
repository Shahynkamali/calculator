<template>
  <div
    role="group"
    class="fieldset"
  >
    <BaseLabel
      :class="'input input--small input--label label__text rounded-r-none'"
      :label="value ? value._value : null"
    />
    <BaseInput
      class="input input--small rounded-l-none"
      :value="value ? value._unit.label : null"
      :readonly="readonly"
      :type="'text'"
    />
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import BaseLabel from '@/components/BaseElements/BaseLabel.vue';
import NumberWithUnit from '@/models/NumberWithUnit';

@Component({
  name: 'InputAndLabel',
  components: {
    BaseLabel,
    BaseInput,
  },
})
export default class InputAndLabel extends Vue {
  @Prop({ required: false, type: Object })
  readonly value?: NumberWithUnit | undefined;

  @Prop({ required: false, type: Boolean })
  readonly readonly!: boolean;
}
</script>
