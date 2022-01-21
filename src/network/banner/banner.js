import {request} from "@/network/request";
function  getBanner (type) {
    return request ({
        url: "/banner",
        params: {
            type: type
        }
    });
}
export {getBanner};
