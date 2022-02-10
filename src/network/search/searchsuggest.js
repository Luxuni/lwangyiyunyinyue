/*传入关键字获取搜索建议列表*/
import {request} from "@/network/request";
function getSearchSuggest (keywords) {
    return request ({
        url: "/search/suggest",
        params: {
            keywords: keywords
        }
    });
}
export {getSearchSuggest};
