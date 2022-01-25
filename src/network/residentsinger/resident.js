import {request} from "@/network/request";
function getResidentSinger (offset, limit) {
    return request ({
        url: "/top/artists",
        params: {
            offset: offset,
            limit: limit
        }
    });
}
export {getResidentSinger};
