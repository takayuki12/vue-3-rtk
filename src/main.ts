import { createApp } from "vue";
import App from "./App.vue";
import { createRedux } from "./storePlugin";
import { store } from "./store";

createApp(App).use(createRedux(store)).mount("#app");
