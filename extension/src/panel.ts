import * as debug from 'debug';
debug.enable('ext:*')
const log = debug('ext:panel-ts');

import './style.scss';

import App from './panel.vue';

import Twitch from './twitch-plugin';

import Vue from 'vue';
Vue.use(Twitch);

const app = new Vue({
    render: h => h(App)
}).$mount('#app');