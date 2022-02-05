import {getPlaylistTrackAll} from "@/network/songs/getplaylisttrackall";
import {getSongUrl} from "@/network/songs/getsongurl";
export default {
    namespaced: true,
    state: {
        playlist: []
    },
    mutations: {
        /*将整理好的歌单数据保存到歌单中*/
        PROCESS_PLAYLIST (state, value) {
            state.playlist = value;
        },
        /*删除歌单中指定的单曲*/
        DELETE_THIS (state, value) {
            state.playlist.splice (value.$index, 1);
        }
    },
    actions: {
        /*整理歌单的数据*/
        async processPlaylist (store, value) {
            const {data: res} = await getPlaylistTrackAll (value.id);
            const allId = res.songs.map (item => item.id).join (",");
            const {data: allUrls} = await getSongUrl (allId);
            const informationNeeded = res.songs.map (item => {
                return {
                    id: item.id,
                    picUrl: item.al.picUrl,
                    name: item.name,
                    ar: item.ar.map (item => item.name).join (" "),
                    arId: item.ar.map (item => item.id),
                    url: allUrls.data.filter (element => element.id === item.id)[0].url,
                    /*控制删除弹出框的显示与否，不重要的属性*/
                    deletePopover:false
                };
            });
            store.commit ("PROCESS_PLAYLIST", informationNeeded);
        }
    },
    modules: {}
};
