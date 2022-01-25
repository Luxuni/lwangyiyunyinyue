import {request} from "@/network/request";
function getNewcomer (limit) {
    return request ({
        url: "/dj/toplist/newcomer",
        params: {
            limit: limit
        }
    });
}
export  {getNewcomer};
