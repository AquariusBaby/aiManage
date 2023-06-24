import io from "./io";


export function getSystemPayConfig(o) {
    return io({
        method: "get",
        url: "/api/back/system/config/alipay/pc",
        testUrl: "/api/back/system/config/alipay/pc",
        params: o,
    });
}

export function saveSystemPayConfig(o) {
    return io({
        method: "post",
        url: "/api/back/system/config/alipay/pc/update",
        testUrl: "/api/back/system/config/alipay/pc/update",
        data: o,
    });
}