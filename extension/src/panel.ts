import * as debug from 'debug';
debug.enable('ext:*')
const log = debug('ext:panel-ts');

import App from './panel.vue';

import Vue from 'vue';

const app = new Vue({
    render: h => h(App)
}).$mount('#app');