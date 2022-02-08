import {request} from "@/network/request";
function loginInterface (phone, password) {
    return request ({
        url: "/login/cellphone",
        params: {
            phone: phone,
            password: password
        }
    });
}
export {loginInterface};
