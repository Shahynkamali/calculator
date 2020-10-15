<template>
  <div>
    <SideBar
      @toggleModalVisibility="toggleModalVisibility"
    />
    <div class="container">
      <Modal
        v-if="isModalVisible"
        @toggleModalVisibility="toggleModalVisibility"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import SideBar from '@/components/SideBar.vue';

@Component({
  name: 'App',
  components: {
    Modal,
    SideBar,
  },
})
export default class App extends Vue {
  private isModalVisible = false

  private toggleModalVisibility(): void {
    this.isModalVisible = !this.isModalVisible;
  }
}
</script>

<style lang="scss">

@import 'assets/styles/tailwind.postcss';

.container {
  background: #E5E5E5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
