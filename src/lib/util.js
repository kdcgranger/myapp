import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'

export const TOKEN_KEY = 'token'
/**
 * 设置token
 * @param {*} token 
 */
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}
/**
 * 获取token
 */
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

/**
 * 转换学生申请类型
 * @param {} applyType 
 */
export const convertApplyType = (applyType) => {
  let type = "未知类型";
  if (applyType) {
    if (Number(applyType) === 1 || applyType.soldierInfo) {
      type = "军人";
    } else if (Number(applyType) === 2 || applyType.houseInfo) {
      type = "房产";
    } else if (Number(applyType) === 3 || applyType.householdInfo) {
      type = "户口";
    } else if (Number(applyType) === 5 || applyType.workerInfo) {
      type = "务工";
    } else if (Number(applyType) === 4 || applyType.merchantInfo) {
      type = "商人";
    } else {
      type = "未知类型";
    }
  }
  return type;
}

/**
 * 获取申请信息convertCorporate
 * @param {} applyObj 
 */
export const convertApplyAddr = (applyObj) => {
  let type = "已注册(未填资料)";
  if (applyObj.soldierInfo) {
    type = applyObj.soldierInfo.army;
  } else if (applyObj.houseInfo) {
    type = applyObj.houseInfo.houseAddr;
  } else if (applyObj.householdInfo) {
    type = applyObj.householdInfo.householdAddr;
  } else if (applyObj.workerInfo) {
    type = applyObj.workerInfo.workerAddr;
  } else if (applyObj.merchantInfo) {
    type = (applyObj.merchantInfo.workerCompany || "未知单位") + "（" + (applyObj.merchantInfo.merchantAdd || "未知地址") + "）";
  } else {
    type = "已注册(未填资料)";
  }
  return type;
}

/**
 * 获取申请信息
 * @param {} applyObj 
 */
export const convertCorporater = (applyObj) => {
  let type = "";
  if (applyObj.soldierInfo) {
    type = '';
  } else if (applyObj.houseInfo) {
    type = applyObj.houseInfo.houseOwer || ""
  } else if (applyObj.householdInfo) {
    type = applyObj.householdInfo.householdName || ""
  } else if (applyObj.workerInfo) {
    type = ''
  } else if (applyObj.merchantInfo) {
    type = applyObj.merchantInfo.merchantName || ""
  } else {
    type = "";
  }
  return type;
}

/**
 * 获取申请信息convertCorporate
 * @param {} applyObj 
 */
export const convertCorporaterNum = (applyObj) => {
  let type = "";
  if (applyObj.soldierInfo) {
    type = '';
  } else if (applyObj.houseInfo) {
    type = applyObj.houseInfo.houseNo || ""
  } else if (applyObj.householdInfo) {
    type = applyObj.householdInfo.householdNo || ""
  } else if (applyObj.workerInfo) {
    type = ''
  } else if (applyObj.merchantInfo) {
    type = applyObj.merchantInfo.merchantNo || ""
  } else {
    type = "";
  }
  return type;
}

/**
 * 转换学生申请状态
 * @param {} applyStatu 
 */
export const convertApplyStatu = (applyStatu, role) => {
  let statu = "";
  switch (applyStatu) {
    case 0:
      statu = "已注册";
      break;
    case 1:
      statu = "待更新信息";
      break;
    case 2:
      statu = "待初审";
      break;
    case 3:
      statu = "初审通过";
      break;
    case 4:
      if (Number(role) === 3 || Number(role) === 4) {
        statu = "初审通过";
      } else {
        statu = "待复审";
      }
      break;
    case 5:
      statu = "初审失败";
      break;
    case 6:
      statu = "复审失败";
      break;
    case 7:
      statu = "复审通过";
      break;
    case 8:
      statu = "预录取";
      break;
    case 9:
      statu = "录取";
      break;
    default:
      break;
  }
  return statu;
}
/**
 * 转换图片路径
 * @param {} path 
 */
export const convertImage = (path) => {

  return (typeof (path) === "undefined" || path === "" || path === "null" || path === null) ? "/static/login-bg.jpg" : "/upload/" + path;
}