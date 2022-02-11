import {request} from "@/network/request";
function getList (limit, offset, albumType, type,cookie) {
    return request ({
        url: "/album/songsaleboard",
        params: {
            limit: limit,
            offset: offset,
            albumType: albumType,
            type: type,
            cookie:cookie
        }
    });
}
export {getList};
