import axios from "@/lib/http";
import store from '@/store'
/**
 * 
 * @param {获取短信验证码} phone 
 */
export const getSms = (phone) => {
    return axios.request({
        url: "/enroll/code/getSmsCode?phone=" + phone,
        method: "GET"
    });
}
/**
 * 查询关系
 */
export const getRelation = () => {
    return axios.request({
        url: "/enroll/others/querySysRelation",
        method: "GET"
    });
}
/**
 * 获取学校
 */
export const getSchool = () => {
    return axios.request({
        url: "/enroll/code/getSchool",
        method: "GET",
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 查看学校的统计信息
 */
export const queryStatics = () => {
    return axios.request({
        url: "/enroll/user/selectTotalInfo",
        method: "GET",
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 查看学校的统计信息
 */
export const queryCheckedStatics = () => {
    return axios.request({
        url: "/enroll/user/selectAllotInfo",
        method: "GET",
        headers: {
            token: store.state.user.token
        }
    });
}

/**
 * 查询审核时间
 */
export const getPlan = () => {
    return axios.request({
        url: "/enroll/others/queryPlanTime",
        method: "GET",
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {更新审核时间} data 
 */
export const updatePlan = (data) => {
    return axios.request({
        url: "/enroll/others/updatePlanTime",
        method: "put",
        headers: {
            token: store.state.user.token
        },
        data: data
    });
}