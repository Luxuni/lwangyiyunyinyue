import {request} from "@/network/request";
function quit () {
    return request ({
        url: "/logout",
    });
}
export {quit};
