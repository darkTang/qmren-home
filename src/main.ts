import { createApp } from 'vue';
import './style/common.less';
import App from './App.vue';
import store from './store';

createApp(App).use(store).mount('#app');
