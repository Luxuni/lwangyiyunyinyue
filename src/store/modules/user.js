import {getUserDetail} from "@/network/usermessage/usermessage";
import {getUserPlaylist} from "@/network/usermessage/usermessage";
import {getCookie} from "@/until/cookie";
import {getUserSubCount} from "../../network/usermessage/usermessage";
export default {
    namespaced: true,
    state: {
        userDetail: null,
        userSubCount: {},
        userCreatePlaylist: {},
        userCollectPlaylist: {},
        isLogin: false,
        isShowLoginWindow: false
    },
    mutations: {
        GET_USER_DETAIL (state, value) {
            state.userDetail = value;
            state.isLogin = true;
        },
        WILL_SHOW_LOGIN_WINDOW (state, value) {
            state.isShowLoginWindow = value;
        },
        QUIT (state, value) {
            state.isLogin = value;
            state.userDetail = null;
            state.userSubCount = {};
            state.userCreatePlaylist = {};
            state.userCollectPlaylist = {};
            
        },
        GET_USER_SUB_COUNT (state, value) {
            state.userSubCount = value;
        },
        GET_USER_CREATE_PLAYLIST (state, value) {
            state.userCreatePlaylist = value;
        },
        GET_USER_COLLECT_PLAYLIST (state, value) {
            state.userCollectPlaylist = value;
        }
    },
    actions: {
        async getUserMessage (store, value) {
            const {data: userDetail} = await getUserDetail (value);
            store.commit ("GET_USER_DETAIL", userDetail);
            const userId = value;
            const {data: userSubCount} = await getUserSubCount (getCookie ());
            store.commit ("GET_USER_SUB_COUNT", userSubCount);
            const {data: res} = await getUserPlaylist (userId, getCookie ());
            const userCreatePlaylist = res.playlist.filter (item => item.creator.userId === userId);
            store.commit ("GET_USER_CREATE_PLAYLIST", userCreatePlaylist);
            const userCollectPlaylist = res.playlist.filter (item => item.creator.userId !== userId);
            store.commit ("GET_USER_COLLECT_PLAYLIST", userCollectPlaylist);
        },
    },
    getters: {}
};
