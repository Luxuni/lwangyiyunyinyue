import {request} from "@/network/request";
function getPersonalized (limit) {
    return request ({
        url: "/personalized",
        params: {
            limit: limit
        }
    });
}
export  {getPersonalized};
