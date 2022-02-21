import {request} from "@/network/request";
/*获取歌单数据*/
function getPlaylistTrackAll (id, offset = 0, cookie, limit = 20) {
    return request ({
        url: "/playlist/track/all",
        params: {
            id: id,
            limit: limit,
            offset: offset,
            cookie: cookie
        }
    });
}
/*获取歌单评论*/
function getPlaylistComment (id, offset = 0, cookie, before, limit = 20) {
    return request ({
        url: "/comment/playlist",
        params: {
            id: id,
            limit: limit,
            offset: offset,
            cookie: cookie,
            before: before
        }
    });
}
export {getPlaylistTrackAll, getPlaylistComment};
