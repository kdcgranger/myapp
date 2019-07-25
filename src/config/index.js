export default {
    // baseURL: process.env.NODE_ENV === "production" ? "/" : "http://localhost:8090",
    // fileUploadUrl: process.env.NODE_ENV === "production" ? "/enroll/code/upload" : "http://localhost:8090/enroll/code/upload",
    //baseURL: "http://219.139.135.16",
    baseURL: "http://localhost",
    fileUploadUrl: "http://127.0.0.1/enroll/code/upload",
    // fileUploadUrl: "http://219.139.135.16/enroll/code/photo",
    applyType: [
        { "name": "军人", "code": 1 },
        { "name": "房产", "code": 2 },
        { "name": "户口", "code": 3 },
        { "name": "商人", "code": 4 },
        { "name": "务工", "code": 5 }],
    applyStateSchool: [
        { "name": "已注册", "code": 0 },
        { "name": "待初审", "code": 2 },
        { "name": "初审失败", "code": 5 },
        { "name": "初审通过", "code": 4 }],
    applyStateAdmin: [
        { "name": "已注册", "code": 0 },
        { "name": "待初审", "code": 2 },
        { "name": "初审失败", "code": 5 },
        { "name": "待复审", "code": 4 },
        { "name": "复审通过", "code": 7 },
        { "name": "复审失败", "code": 6 },
        { "name": "预录取", "code": 8 },
        { "name": "录取", "code": 9 }]
}