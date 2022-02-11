import {getPersonalized} from "@/network/recommendlist/recommendList";
import {getCookie} from "@/until/cookie";
export default {
    namespaced: true,
    state: {
        standardItems: []
    },
    mutations: {
        GET_RECOMMEND_LIST_MESSAGES (state, value) {
            state.standardItems = value;
        }
    },
    actions: {
        async getRecommendListMessages (store, value) {
            const recommendMessages = async () => {
                const {data: res} = await getPersonalized (value, getCookie ());
                const standardItems = res.result;
                //处理歌单数据的播放量
                standardItems.forEach (item => {
                    if (item.playCount / 10000 > 1) {
                        item.playCount = Math.round ((item.playCount / 10000)) + "万";
                    } else {
                        item.playCount = item.playCount.toString ();
                    }
                });
                return standardItems;
            };
            let standardItems = await recommendMessages ();
            console.log (standardItems);
            store.commit ("GET_RECOMMEND_LIST_MESSAGES", standardItems);
        }
    },
    getters: {}
};
