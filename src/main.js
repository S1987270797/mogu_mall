import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast'
Vue.config.productionTip = false

// 使用fastclick插件
Fastclick.attach(document.body);

// 写一个$bus 总线 // 添加事件总线对象
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast)
// 使用图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/mugu-lazylaod.png')
})

new Vue({
  // el: '#app',
  render: h => h(App),
  router,
  store
}).$mount('#app')

// require('./assets/css/base.css') // 放在style里面使用@import 引入css文件