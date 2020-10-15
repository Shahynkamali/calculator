<template>
  <div
    role="group"
  >
    <BaseInput
      :value="value ? value._value : null"
      :readonly="readonly"
      class="input input--small"
      :type="'number'"
      @handleForm="handleInput"
    />
    <BaseSelect
      :small="true"
      :value="value ? value._unit : null"
      :options="options"
      @handleForm="handleSelect"
    />
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import BaseSelect from '@/components/BaseElements/BaseSelect.vue';
import BaseLabel from '@/components/BaseElements/BaseLabel.vue';
import NumberWithUnit from '@/models/NumberWithUnit';
import BaseDropdown from '@/components/BaseElements/BaseDropdown.vue';
import Unit from '@/models/Unit';

@Component({
  name: 'InputAndSelect',
  components: {
    BaseInput,
    BaseSelect,
    BaseLabel,
    BaseDropdown,
  },
})
export default class InputAndSelect extends Vue {
  @Watch('value', { deep: true })
  watchForChange(desiredVolume: NumberWithUnit) {
    this.$emit('handleForm', desiredVolume);
  }

  @Prop({ required: false, type: Array })
  readonly options!: Array<any>;

  @Prop({ required: true, type: Object })
  public value!: NumberWithUnit

  @Prop({ required: false, type: String })
  readonly type!: string

  @Prop({ required: false, type: Boolean })
  readonly readonly!: boolean


  handleInput(number: number) {
    this.value.value = number;
  }

  handleSelect(unit: Unit) {
    if (unit.label) {
      this.value.unit = unit.label;
    }
  }

  created(): void {
    this.$emit('handleForm', this.value);
  }
}
</script>
