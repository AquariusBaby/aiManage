import io from "./io";


export function getUserTableData(o) {
  return io({
    method: "get",
    url: "/api/back/user/page",
    testUrl: "/api/back/user/page",
    params: o,
  });
}

// export function getDialogueStatistics(o) {
//   return io({
//     method: "get",
//     url: "/api/back/index/userChatDetailCount",
//     testUrl: "/api/back/index/userChatDetailCount",
//     params: o,
//   });
// }

// export function getOrderStatistics(o) {
//   return io({
//     method: "get",
//     url: "/api/back/index/orderCount",
//     testUrl: "/api/back/index/orderCount",
//     params: o,
//   });
// }
