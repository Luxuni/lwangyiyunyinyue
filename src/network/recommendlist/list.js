import {request} from "@/network/request";
function getList (limit, offset, albumType, type) {
    return request ({
        url: "/album/songsaleboard",
        params: {
            limit: limit,
            offset: offset,
            albumType: albumType,
            type: type,
        }
    });
}
export {getList};
