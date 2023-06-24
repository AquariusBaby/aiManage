import io from "./io";

export function getDialogueRecord(o) {
    return io({
        method: "get",
        url: "/api/back/userChatDetail/page",
        testUrl: "/api/back/userChatDetail/page",
        params: o,
    });
}

export function getPayRecord(o) {
    return io({
        method: "get",
        url: "/api/back/orderDetail/page",
        testUrl: "/api/back/orderDetail/page",
        params: o,
    });
}

export function getAllRoleList(o) {
    return io({
        method: "get",
        url: "/api/label/findLabelRole",
        testUrl: "/api/label/findLabelRole",
        params: o,
    });
}
