import {request} from "@/network/request";
/*根据用户id获取用户详情*/
function getUserDetail (uid) {
    return request ({
        url: "/user/detail",
        params: {
            uid: uid
        }
    });
}
function getUserSubCount (cookie) {
    return request ({
        url: "/user/subcount",
        params: {
            cookie: cookie
        }
    });
}
function getUserPlaylist (uid, cookie) {
    return request ({
        url: "/user/playlist",
        params: {
            uid: uid,
            cookie: cookie
        },
    });
}
export {getUserDetail, getUserSubCount, getUserPlaylist};

