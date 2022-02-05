import {request} from "@/network/request";
function getPlaylistTrackAll (id, limit, offset) {
    return request ({
        url: "/playlist/track/all",
        params: {
            id: id,
            limit: limit,
            offset: offset
        }
    });
}
export {getPlaylistTrackAll};
