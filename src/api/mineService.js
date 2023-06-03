import io from "./io";

export function getUserInfo(o) {
    return io({
        methods: "get",
        url: "/api/label/findLabelRole",
        testUrl: "/api/label/findLabelRole",
        params: o,
    });
}
