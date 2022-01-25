import {request} from "@/network/request";
function getAlbumList (limit) {
    return request ({
        url: "/album/list",
        params: {
            limit: limit
        }
    });
}
export  {getAlbumList};
