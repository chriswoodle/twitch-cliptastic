import * as debug from 'debug';
const log = debug('ext:config-ts');

import App from './config.vue';

import Vue from 'vue';

const app = new Vue({
    render: h => h(App)
}).$mount('#app');