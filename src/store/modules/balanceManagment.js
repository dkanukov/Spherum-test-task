export default {
    state: {
        balance: 1000,
    },
    getters: {
        getBalance: (state) => state.balance
    },
    mutations: {
        setNewBalance: (state, payload) => {
            state.balance = payload;
        }
    }
}
