import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVueNext from "bootstrap-vue-next";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(BootstrapVueNext);

app.mount("#app");
