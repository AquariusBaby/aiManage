import io from "./io";

export function loginIn(o) {
    return io({
        method: "post",
        url: "/api/user/login",
        testUrl: "/api/user/login",
        data: o,
    });
}

export function getUserInfo(o) {
    return io({
        method: "get",
        url: "/api/user/info",
        testUrl: "/api/user/info",
        data: o,
    });
}
