import axios from "@/lib/http";
import store from '@/store'
/**
 * 
 * @param {登录接口} param0 
 */
export const login = ({
    idCard,
    pwd
}) => {
    return axios.request({
        url: "/enroll/user/login?idCard=" + idCard + "&pwd=" + pwd,
        method: "post",
        data: {
            idCard: idCard,
            pwd: pwd
        }
    });
}
/**
 * 退出操作
 */
export const logout = () => {
    return new Promise((resolve, reject) => {
        const error = null;
        setTimeout(() => {
            if (!error) {
                resolve({
                    "code": "200",
                    "info": {
                        "appName": "new App info"
                    }
                })
            } else {
                reject(error);
            }
        });
    });
}
/**
 * 
 * @param {注册接口} params 
 */
export const register = (params) => {
    return axios.request({
        url: "/enroll/apply/register",
        method: "post",
        data: params
    });
}
/**
 * 获取用户的个人的信息
 */
export const getUserInfo = (userId) => {
    return axios.request({
        url: "/enroll/user/queryUserById?userId=" + userId,
        method: "get",
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {提交用户监护人信息} params 
 */
export const updateUserInfo = (params) => {
    return axios.request({
        url: "/enroll/apply/addInfo",
        method: "post",
        data: params,
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {更新学位申请信息} params 
 */
export const updateApplyInfo = (params) => {
    return axios.request({
        url: "/enroll/apply/addApply",
        method: "post",
        data: params,
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {修改密码} param0 
 */
export const updatePwd = ({
    oldPwd,
    newPwd
}) => {
    return axios.request({
        url: "/enroll/user/updatePassword",
        method: "post",
        data: {
            "newPwd": newPwd,
            "pwd": oldPwd
        },
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {重置密码} params 
 */
export const resetPwd = (params) => {
    return axios.request({
        url: "/enroll/user/resetPassword",
        method: "post",
        data: params
    });
}