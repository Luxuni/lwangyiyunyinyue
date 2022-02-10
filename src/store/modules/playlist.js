import {getPlaylistTrackAll} from "@/network/songs/getplaylisttrackall";
import {getSongUrl} from "@/network/songs/getsongurl";
/*es5歌单去重方法，以后改进*/
function unique (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].id === arr[j].id) {         //第一个等同于第二个，splice方法删除第二个
                arr.splice (j, 1);
                j--;
            }
        }
    }
    return arr;
}
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
        ADD_SINGLE (state, value) {
            state.playlist.unshift (value);
            state.playlist = unique (state.playlist);
            console.log (unique (state.playlist));
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
                    deletePopover: false
                };
            });
            store.commit ("PROCESS_PLAYLIST", informationNeeded);
        },
        /*整理单曲的数据*/
        async getSingleUrl (store, value) {
            const {data: allUrls} = await getSongUrl (value.id);
            const singleInformationNeeded = {
                id: value.id,
                picUrl: value.album.artist.img1v1Url,
                name: value.value,
                ar: value.artists.map (item => item.name).join (" "),
                arId: value.artists.map (item => item.id),
                url: allUrls.data[0].url,
                /*控制删除弹出框的显示与否，不重要的属性*/
                deletePopover: false
            };
            store.commit ("ADD_SINGLE", singleInformationNeeded);
        }
    },
    modules: {}
};
