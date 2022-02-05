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
export {getSongUrl};
