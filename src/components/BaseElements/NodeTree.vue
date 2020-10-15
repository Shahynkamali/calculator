<template>
  <div :class="nodeHasChildren ? 'wrapper': null">
    <li
      :class="{'node-label--checked' : checkedNode}"
      class="node-tree node-children--active"
      @mouseover="handleHover($event)"
    >
      <span
        v-if="!label"
        class="base-select cursor-pointer node-select border-l-0"
        @click="toggleDropdown"
      >
        <ArrowDownSVG />
      </span>

      <span
        v-else
        class="node-label"
        :class="nodeHasChildren ? 'parent' : null"
        @click="handleClick(node)"
      >
        {{ label }}

        <ArrowRightSVG
          v-if="nodeHasChildren"
          class="node-arrow-right mx-2"
        />

        <TicSVG
          v-if="checkedNode"
          class="node-tic"
        />

      </span>
      <ul
        v-if="node.children"
        :class="[index >= 0 ? 'node-children--nested' : null,
                 {'node-children--active' : isActive}]"
        class="node-children shadow-md"
      >
        <node
          v-for="(child, index) in node.children"

          :key="index"
          :value="value"
          :node="child"
          :index="index"
          :handle-click="handleClick"
          :handle-hover="handleHover"
        />
      </ul>
    </li>
  </div>
</template>

<script lang="ts">
import {
  Vue, Prop, Component,
} from 'vue-property-decorator';
import ArrowRightSVG from '@/assets/svgs/arrowright.svg';
import ArrowDownSVG from '@/assets/svgs/arrowdown.svg';
import TicSVG from '@/assets/svgs/tick.svg';
import Unit, { NodeWithChildren } from '@/models/Unit';

@Component({
  name: 'Node',
  components: {
    ArrowRightSVG,
    ArrowDownSVG,
    TicSVG,
  },
})

export default class NodeTree extends Vue {
  @Prop({ required: true, type: Function })
  public handleClick?: Function

  @Prop({ required: false, type: Function })
  public toggleDropdown?: Function;

  @Prop({ required: true, type: Function })
  public handleHover?: Function;

  @Prop({ required: false, type: Object })
  readonly node!: NodeWithChildren;

  @Prop({ required: false, type: Number })
  public index!: number;

  @Prop({ required: false, type: Boolean })
  public isActive!: boolean;

  @Prop({ required: true, type: Object })
  private value!: Unit;

  private get nodeHasChildren(): boolean {
    return !!(this.node.children && this.node.children.length);
  }

  private get label(): string | undefined {
    return this.node.label;
  }

  private get checkedNode(): boolean {
    return !!(this.value && this.value.label === this.node.label);
  }
}


</script>

<style lang="scss">

.wrapper {
  position: relative;
}

.node-tree {
  &:hover {
      > .node-children--nested {
        display: block;
      }

    }

  // .parent {
  //   border: 1px solid red;
  // }

  .node-label {
    background: white;
    display: flex;
    padding: 0.5em;
    align-items: center;
    justify-content: space-between;


      &:hover {
        background: seashell;
        cursor: pointer;
      }
  }

  .node-select {
    width: 18px;
  }

  .node-label-select {
    display: inline-flex;
    width: 30px;
    cursor: pointer;
    background: #edf2f7;
    border-top-right-radius: 0.125rem;
    border-bottom-right-radius: 0.125rem;
  }

  .node-children--nested {
    display: none;
    position: absolute;
    left:100% !important;

    top: 0 !important;
    z-index: 2;
  }

  .node-children {
    display: none;
    min-width: 150px;
    position: absolute;
    top: 100%;
    z-index: 2;
    right:0;

    .wrapper {
      // position: absolute;
      // z-index: 10;
    }

  }

  .node-children--active {
    display: block !important;
  }

  .node-children--selected {
    display: block !important;
  }

  .node-tic {
    width: 15px;
    margin-left: 15px;
  }

  .node-arrow-right {
    width: 13px;

  }
}
</style>
