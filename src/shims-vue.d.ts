declare module '*.vue' {

  export default Vue;
}

declare module '*.svg' {

  import { VueConstructor } from 'vue';

  const content: VueConstructor<Vue>;
  export default content;
}

declare module 'uuid/v4' { }
