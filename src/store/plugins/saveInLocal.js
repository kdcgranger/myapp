export default store => {
    //在每次实例初始化时调用
    /**
     * subscribe(handler: Function): Function
     *订阅 store 的 mutation。handler 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数：
     */

    if (localStorage.state) {
        store.replaceState(JSON.parse(localStorage.state));
    }
    store.subscribe((mutation, state) => {
        localStorage.state = JSON.stringify(state)
    })
}