import {request} from "@/network/request";
function getUserDetail (uid) {
    return request ({
        url: "/user/detail",
        params: {
            uid: uid
        }
    });
}
export {getUserDetail};
