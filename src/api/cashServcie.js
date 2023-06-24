import io from "./io";

// 提现记录
export function getWithdrawalRecord(o) {
    return io({
        method: "get",
        url: "/api/withdrawal/page",
        testUrl: "/api/withdrawal/page",
        params: o,
    });
}

// 申请提现
export function applyWithdrawal(o) {
    return io({
        method: "post",
        url: "/api/withdrawal/create",
        testUrl: "/api/withdrawal/create",
        data: o,
    });
}

// 分佣记录查询-分页
export function getCommissionRecord(o) {
    return io({
        method: "get",
        url: "/api/back/commissionDetail/page",
        testUrl: "/api/back/commissionDetail/page",
        params: o,
    });
}

// 分佣记录查询-单条
export function getCommissionRecordById(o) {
    return io({
        method: "post",
        url: "/api/back/commissionDetail/get",
        testUrl: "/api/back/commissionDetail/get",
        data: o,
    });
}

// 分销设置-列表查询
export function getRetailSettingRecord(o) {
    return io({
        method: "get",
        url: "/api/back/commissionConfig/page",
        testUrl: "/api/back/commissionConfig/page",
        params: o,
    });
}

// 分销设置-更新
export function updateRetailSetting(o) {
    return io({
        method: "post",
        url: "/api/back/commissionConfig/update",
        testUrl: "/api/back/commissionConfig/update",
        data: o,
    });
}