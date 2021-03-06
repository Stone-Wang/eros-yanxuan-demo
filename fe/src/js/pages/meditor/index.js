/*
 * @Author: Zero 
 * @Date: 2017-10-10 11:12:40 
 * @Last Modified by: Zero
 * @Last Modified time: 2017-10-11 12:22:01
 */
// 这个vue的实例我们在app启动的时候就执行并常驻app内存，在app关闭时候销毁，所以data中的数据每次重启都会被初始化
// 而我们在app运行期间都可以任意改变data中的数据，然后推送给订阅者

// 如果想要持久化存储，可以配合storage来完成，每次启动app时候都从本地取数据，当data改变的时候异步的更新一下即可
// 住： 不能再app退出的时候来持久化存储，退出时间很短，无法保证存储成功
import 'Config'
new Vue({
    template: '<div></div>',
    data() {
        return {
            count: 0
        }
    },
    watch: {
        count(newVal, oldVal) {
            // 每当值改变的时候都会推送给订阅 store 变化的事件
            this.$event.emit("store.change", {
                newVal,
                oldVal
            })
        }
    },
    methods: {
        bindEvent() {
            this.$event.on("store.count.add", resData => {
                this.count++
            })
        }
    },
    created() {
        this.bindEvent()
    }
});