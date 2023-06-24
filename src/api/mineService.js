import io from "./io";

export function getUserInfo(o) {
    return io({
        method: "get",
        url: "/api/label/findLabelRole",
        testUrl: "/api/label/findLabelRole",
        params: o,
    });
}
