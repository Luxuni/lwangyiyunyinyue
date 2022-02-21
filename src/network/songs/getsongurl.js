import {request} from "@/network/request";
function getSongUrl (id, br) {
    return request ({
        url: "/song/url",
        params: {
            id: id,
            br: br
        }
    });
}
function getSongDetail (ids) {
    return request ({
        url: "/song/detail",
        params: {
            ids: ids,
        }
    });
}
export {getSongUrl,getSongDetail};
