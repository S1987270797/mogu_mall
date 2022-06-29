import Toast from "./Toast.vue"
const obj = {}
obj.install = function (Vue) { //install函数会在 Vue.use(toast) 时执行 // 自带一个vue对象
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式, 根据组件构造器, 可以创建出来一个组件对象. 直接new出来一个组件 牛b
    const toast = new toastConstructor();

    // 3.将组件对象,手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    // 可以在任何地方使用$toast
    Vue.prototype.$toast = toast; // 等于自己用组件构造器创建出来的对象
}

export default obj