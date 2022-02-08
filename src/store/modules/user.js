import {getUserDetail} from "@/network/usermessage/usermessage";
export default {
    namespaced: true,
    state: {
        userDetail: {},
        isLogin: false
    },
    mutations: {
        GET_USER_DETAIL (state, value) {
            state.userDetail = value;
            state.isLogin = true;
        }
    },
    actions: {
        async getUserMessage (store, value) {
            const {data: res} = await getUserDetail (value);
            store.commit ("GET_USER_DETAIL", res);
        }
    },
    getters: {}
};
