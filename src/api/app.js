import axios from "@/lib/http";
import store from '@/store'
export const getAppName = () => {
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
 * @param {根据学生的id获取录取情况} studentId 
 */
export const queryApply = (studentId) => {
    return axios.request({
        url: "/enroll/check/queryApply?studentId=" + studentId,
        method: "get",
        headers: {
            token: store.state.user.token
        }
    });
}

/**
 * 
 * @param {查看审核记录} param0 
 */
export const queryCheckInfo = ({
    applyStatus,
    applyType,
    checkSchoolId,
    idCard,
    allotSchoolId,
    studentName,
    pageSize,
    pageNum
}) => {
    return axios.request({
        url: "/enroll/check/queryCheckInfo?applyStatus=" + applyStatus + "&applyType=" + applyType + "&checkSchoolId=" + checkSchoolId + "&idCard=" + idCard + "&allotSchoolId=" + allotSchoolId + "&studentName=" + studentName + "&pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "get",
        headers: {
            token: store.state.user.token
        }
    });
}
/**
 * 
 * @param {驳回学生申请} dismiss 
 */
export const dismissApply = (dismiss) => {
    return axios.request({
        url: "/enroll/check/dismissApply",
        method: "post",
        headers: {
            token: store.state.user.token
        },
        data: dismiss
    });
}
/**
 * 
 * @param {分配学校} data 
 */
export const schoolAllot = (data) => {
    return axios.request({
        url: "/enroll/check/allotSchool",
        method: "post",
        headers: {
            token: store.state.user.token
        },
        data: data
    });
}
/**
 * 
 * @param {查询本校的录取状态} param0 
 */
export const enrollStudent = ({
    studentName,
    idCard,
    pageSize,
    pageNum
}) => {
    return axios.request({
        url: "/enroll/check/querySchoolStudent?studentName=" + studentName + "&idCard=" + idCard + "&pageSize=" + pageSize + "&pageNum=" + pageNum,
        method: "get",
        headers: {
            token: store.state.user.token
        }
    });
}

/**
 * 
 * @param {批量通过学生申请} data 
 */
export const approveApply = (data) => {
    return axios.request({
        url: "/enroll/check/approved",
        method: "post",
        headers: {
            token: store.state.user.token
        },
        data: data
    });
}
/**
 * 下载数据
 * @param {*} data 
 */
export const download = (data) => {
    return axios.request({
        url: "/enroll/code/exportData",
        method: "post",
        headers: {
            token: store.state.user.token
        },
        data: {
            "studentIds": data
        }
    });
}