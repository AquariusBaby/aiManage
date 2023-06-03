import io from "./io";


export function getDataStatistics(o) {
  return io({
    methods: "get",
    url: "/api/back/index/count",
    testUrl: "/api/back/index/count",
    params: o,
  });
}

export function getDialogueStatistics(o) {
  return io({
    methods: "get",
    url: "/api/back/index/userChatDetailCount",
    testUrl: "/api/back/index/userChatDetailCount",
    params: o,
  });
}

export function getOrderStatistics(o) {
  return io({
    methods: "get",
    url: "/api/back/index/orderCount",
    testUrl: "/api/back/index/orderCount",
    params: o,
  });
}
