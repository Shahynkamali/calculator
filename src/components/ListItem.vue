<template>
  <div>
    <li
      v-if="typeof item === 'string'"
      class="inline-flex measurment pt-1"
    >
      {{ item }}
    </li>
    <li
      v-if=" item instanceof Object"
      class="inline-flex measurment pt-1"
    >
      {{ item._value }}
      <span
        v-if="item._unit.label"
        class=" ml-1 text-sm normal-case"
      >
        {{ item._unit.label }}
      </span>
    </li>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import NumberWithUnit from '@/models/NumberWithUnit';

@Component({
  name: 'ListItem',
})

export default class ListItem extends Vue {
  @Prop({ required: false, type: [Object, String] })
  readonly item?: NumberWithUnit | string
}
</script>
