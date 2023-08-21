import createAxios from '/@/utils/axios'
import { useUserInfo } from '/@/stores/userInfo'
import { useConfig } from '/@/stores/config'

const controllerUrl = '/api/user/'
const accountUrl = '/api/account/'

// 获取菜单
export function index() {
    return createAxios({
        url: controllerUrl + 'index',
        method: 'get',
    })
}

// 登录
export function checkIn(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'checkIn',
        data: params,
        method: method,
    }) as ApiPromise
}

export function overview() {
    return createAxios({
        url: accountUrl + 'overview',
        method: 'get',
    })
}

// 工艺流程页面IPP初始请求(无返回值的)
export function monitorOptions1(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options1',
        data: params,
        method: method,
    }) as ApiPromise
}

// 工艺流程页面IPP获取各点位数据
export function getOperationData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options1/getOperationData',
        data: params,
        method: method,
    }) as ApiPromise
}

// 关键参数页面的请求（无返回数据）
export function monitorOptions2(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2',
        data: params,
        method: method,
    }) as ApiPromise
}

export function runAspen(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2/runAspen',
        data: params,
        method: method,
    }) as ApiPromise
}

// 关键参数页面-历史数据-查询
export function getPPData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2/getPPData',
        data: params,
        method: method,
    }) as ApiPromise
}

// 质量预测
export function qualityOptions1(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'qualityPred/options1',
        data: params,
        method: method,
    }) as ApiPromise
}

// -----------------------------------------------------------------------------

// 总貌接口
export function homePage(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'dashboard',
        data: params,
        method: method,
    }) as ApiPromise
}
// 总貌查询数据
export function getHDPEData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'dashboard/getHDPEData',
        data: params,
        method: method,
    }) as ApiPromise
}

// 获取反应器数据
export function getR1Para(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'menu3/opt3/R1',
        data: params,
        method: method,
    }) as ApiPromise
}

export function getR2Para(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'menu3/opt3/R2',
        data: params,
        method: method,
    }) as ApiPromise
}

// 产品质量预测页面
export function productPred(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'productPred',
        data: params,
        method: method,
    }) as ApiPromise
}

// 产品仿真模拟页面
export function simulation(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'simulation',
        data: params,
        method: method,
    }) as ApiPromise
}

// 新页面的质量预测的查询按钮（应该是post方法，但是目前还不完善）
export function getHdpeData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'menu3/opt1/getHdpeData',
        data: params,
        method: method,
    }) as ApiPromise
}

//  测试的路由
export function testApi(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'newTest/page4/testapi',
        data: params,
        method: method,
    }) as ApiPromise
}


//  测试的路由
export function gradeResult(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'trajectoryOptimize/opt1/gradeResult',
        data: params,
        method: method,
    }) as ApiPromise
}








// ------------------------------------------------------------------------------------------------

// 运行预测模型
export function runPredictModel(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'qualityPred/options1/runPredictModel',
        data: params,
        method: method,
    }) as ApiPromise
}

// 获取熔指数据
export function getMIData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2/getMIData',
        data: params,
        method: method,
    }) as ApiPromise
}

// 上传目标的分子量分布
export function uploadTargetMW(method: 'get' | 'post', params: object = {}): ApiPromise {
    const config = useConfig()
    return createAxios({
        url: controllerUrl + 'monitor/options2/uploadTargetMW',
        data: params,
        method: method,
        headers: {
            'Content-Type': 'multipart/form-data',
            'lang': config.lang.defaultLang,
            server: true,
        },
    }) as ApiPromise
}







// ---------------------------------------------------------------------------------------


export function postProfile(params: anyObj) {
    return createAxios(
        {
            url: accountUrl + 'profile',
            method: 'POST',
            data: params,
        },
        {
            showSuccessMessage: true,
        }
    )
}

export function changePassword(params: anyObj): ApiPromise {
    return createAxios(
        {
            url: accountUrl + 'changePassword',
            method: 'POST',
            data: params,
        },
        {
            showSuccessMessage: true,
        }
    ) as ApiPromise
}

export function getBalanceLog(page: number, pageSize: number): ApiPromise {
    return createAxios({
        url: accountUrl + 'balance',
        method: 'GET',
        params: {
            page: page,
            limit: pageSize,
        },
    }) as ApiPromise
}

export function getIntegralLog(page: number, pageSize: number): ApiPromise {
    return createAxios({
        url: accountUrl + 'integral',
        method: 'GET',
        params: {
            page: page,
            limit: pageSize,
        },
    }) as ApiPromise
}

export function postLogout(): ApiPromise {
    const userInfo = useUserInfo()
    return createAxios({
        url: controllerUrl + 'logout',
        method: 'POST',
        data: {
            refresh_token: userInfo.getToken('refresh'),
        },
    }) as ApiPromise
}

export function retrievePassword(params: anyObj): ApiPromise {
    return createAxios(
        {
            url: accountUrl + 'retrievePassword',
            method: 'POST',
            data: params,
        },
        {
            showSuccessMessage: true,
        }
    ) as ApiPromise
}
