import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import './assets/scss/main.scss';

// google material-icons
import 'material-icons/iconfont/material-icons.css';

import { Events } from './assets/MittTypes';

const emitter = mitt < Events>();

const app = createApp(App);
// 전역 event bus
app.config.globalProperties.emitter = emitter;
app.mount('#app');
