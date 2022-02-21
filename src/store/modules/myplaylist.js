import {getPlaylistTrackAll} from "@/network/songs/getplaylisttrackall";
import {getCookie} from "../../until/cookie";
import {getPlaylistComment} from "../../network/songs/getplaylisttrackall";
function formatSeconds (value) {
    let theTime = Math.round (value / 1000);// 秒
    let theTime1 = 0;// 分
    if (theTime > 60) {
        theTime1 = Math.floor (theTime / 60);
        theTime = theTime % 60;
        if (theTime < 10) {
            return `${theTime1}:0${theTime}`;
        }
        return `${theTime1}:${theTime}`;
    } else if (theTime < 10) {
        return `0:0${theTime}`;
    } else {
        return `0:${theTime}`;
    }
}
export default {
    namespaced: true,
    state: {
        userWantShowPlaylist: [],
        playlistId: "",
        userWantShowPlaylistMessage: {},
        hotComments: [],
        comments: [],
        commentsTotal: 0
    },
    mutations: {
        GET_USER_WANT_SHOW_PLAYLIST (state, value) {
            state.userWantShowPlaylist = value;
        },
        GET_PLAYLIST_ID (state, value) {
            state.playlistId = value;
        },
        GET_USER_WANT_SHOW_PLAYLIST_MESSAGE (state, value) {
            state.userWantShowPlaylistMessage = value;
        },
        GET_HOT_COMMENTS (state, value) {
            state.hotComments = value;
        },
        GET_COMMENTS (state, value) {
            state.comments = value;
        },
        GET_COMMENTS_TOTAL (state, value) {
            console.log (value);
            state.commentsTotal = value;
        }
    },
    actions: {
        async getUserWantShowPlaylist (store, value) {
            const {data: res} = await getPlaylistTrackAll (store.state.playlistId, value.offset, getCookie ());
            const informationNeeded = res.songs.map (item => {
                return {
                    id: item.id,
                    picUrl: item.al.picUrl,
                    name: item.name,
                    ar: item.ar.map (item => item.name).join (" "),
                    arId: item.ar.map (item => item.id),
                    url: null,
                    time: formatSeconds (item.dt),
                    deletePopover: false
                };
            });
            store.commit ("GET_USER_WANT_SHOW_PLAYLIST", informationNeeded);
        },
        getUserWantShowPlaylistId (store, value) {
            store.commit ("GET_PLAYLIST_ID", value.id);
        },
        async getUserWantPlaylistComment (store, value) {
            const {data: res} = await getPlaylistComment (store.state.playlistId, value.offset, getCookie ());
            console.log (res);
            const hotComments = res.hotComments;
            store.commit ("GET_HOT_COMMENTS", hotComments);
            const comments = res.comments;
            store.commit ("GET_COMMENTS", comments);
            store.commit ("GET_COMMENTS_TOTAL", res.total);
        }
    },
    getters: {}
};
