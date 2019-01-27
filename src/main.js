import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Bars from 'vuebars'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Bars);
Vue.use(VueChartkick, {adapter: Chart});

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
