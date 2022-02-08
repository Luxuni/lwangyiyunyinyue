import {request} from "@/network/request";
function getPersonalized (limit,cookie) {
    return request ({
        url: "/personalized",
        params: {
            limit: limit,
            cookie:cookie
        }
    });
}
export  {getPersonalized};
