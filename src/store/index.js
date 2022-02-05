import {createStore} from "vuex";
import createPersistedstate from "vuex-persistedstate";
import global from "./modules/global.js";
import playlist from "./modules/playlist.js";
export default createStore ({
    // 公共模板直接在这里展开就可以
    ...global,
    modules: {
        playlist
    },
    plugins: [
        createPersistedstate ({
            key: "",
            paths: [""]
        })
    ]
});
