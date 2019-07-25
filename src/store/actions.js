import {
    getAppName
} from "@/api/app"
const actions = {
    /**
     * Action 通过 store.dispatch 方法触发：store.dispatch('increment')
     */
    updateAppName({
        commit,
        state
    }, data) {
        getAppName().then(res => {
            /**
             * 调用mutations里的方法，其中changeName是mutations里的方法名
             */
            commit("changeName", new Date());
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 第二种方法
     */
    async getAppName({
        commit
    }) {
        /**
         * 1) inf:{appName}这是es6里的语法
         * 2) async/await 组合相当于将异步变为 了同步
         */

        try {
            const {
                info: {
                    appName
                }
            } = await getAppName();
            commit("changeName", appName)
        } catch (e) {
            console.error(e);
        }

    }
};
export default actions;