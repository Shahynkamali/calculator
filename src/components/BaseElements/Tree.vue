<template>
  <div class="tree">
    <ul class="tree-list">
      <NodeTree
        :value="value"
        :handle-click="handleClick"
        :toggle-dropdown="toggleDropdown"
        :node="treeData"
        :is-active="isActive"
        :handle-hover="handleHover"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import NodeTree from '@/components/BaseElements/NodeTree.vue';
import Unit from '@/models/Unit';
import NodeDropdown from '@/models/NodeDropdown';

@Component({
  name: 'Tree',
  components: {
    NodeTree,
  },

})

export default class Tree extends Vue {
  @Prop({ required: false, type: Object })
  readonly treeData?: NodeDropdown;

  @Prop({ required: false, type: Object })
  readonly value?: Unit;

  @Prop({ required: false, type: Function })
  public toggleDropdown?: Function;

  @Prop({ required: false, type: Boolean })
  public isActive?: boolean;

  handleClick(node: Unit): void {
    this.$emit('handleNode', node);
  }

  handleHover(event: MouseEvent): void {
    this.$emit('handleHover', event);
  }

  mounted() {
    this.$emit('handleNode', this.value);
  }
}
</script>
