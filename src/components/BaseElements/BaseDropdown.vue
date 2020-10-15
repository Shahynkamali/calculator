<template>
  <div
    class="dropdown"
  >
    <BaseInput
      class="dropdown-select input input--small text-center w-16 rounded-l-none border-r-0"
      :value="unit.label"
      :readonly="true"
      :type="'text'"
    />

    <Tree
      v-if="unit"
      class="dropdown-options"
      :value="unit"
      :tree-data="schema"
      :is-active="isActive"
      :toggle-dropdown="toggleDropdown"
      @handleNode="handleSelect"
      @handleHover="handleHover"
    />
  </div>
</template>


<script lang="ts">
import {
  Component, Vue, Prop,
} from 'vue-property-decorator';
import Tree from '@/components/BaseElements/Tree.vue';
import BaseInput from '@/components/BaseElements/BaseInput.vue';
import Unit, { NodeWithChildren } from '@/models/Unit';
import extractParents from '@/utils/extractParents';
import NodeDropdown from '@/models/NodeDropdown';

@Component({
  name: 'BaseDropdown',
  components: {
    Tree,
    BaseInput,
  },
})

export default class BaseDropdown extends Vue {
  @Prop({ required: true, type: Object })
  private schema!: NodeDropdown;

  @Prop({ required: false, type: Object })
  public unit!: Unit;

  @Prop({ required: true, type: String })
  readonly type!: string;

  private isActive = false;

  private handleSelect(node: NodeWithChildren): void {
    if (!node.children && node.label) {
      this.unit.labelValue = node.label;
      this.$emit('handleSelect', this.unit);
      this.isActive = false;
    }
    if (node.children) {
      this.isActive = true;
    }
  }

  public toggleDropdown(e: Event): void {
    e.stopPropagation();
    this.isActive = !this.isActive;
    const selectedParentNodes: HTMLBaseElement[] = extractParents(e, '.node-children--nested');
    if (this.isActive) {
      window.addEventListener('click', (event: Event) => {
        if (selectedParentNodes.length) {
          selectedParentNodes.forEach((node: HTMLBaseElement) => {
            node.classList.remove('node-children--selected');
          });
        }
        const { className } = event.target as HTMLBaseElement;
        if (className !== 'node-label') {
          this.isActive = false;
        }
      });
    } else {
      window.removeEventListener('click', () => {
        this.isActive = false;
      });
    }
  }

  public handleHover(event: MouseEvent): void {
    const { parentNode } = event.target as HTMLBaseElement;
    if (parentNode) {
      const childNodes = Array.from(parentNode.querySelectorAll('.node-children--nested')) as HTMLBaseElement[];
      if (childNodes.length) {
        childNodes.forEach((node: HTMLBaseElement) => node.classList.remove('node-children--selected'));
      }
    }
  }
}

</script>

<style lang="scss">

.dropdown {
  display: flex;
  align-items: center;
}
</style>
