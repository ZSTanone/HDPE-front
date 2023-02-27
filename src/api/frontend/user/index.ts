import createAxios from '/@/utils/axios'
import { useUserInfo } from '/@/stores/userInfo'
import { useConfig } from '/@/stores/config'

const controllerUrl = '/api/user/'
const accountUrl = '/api/account/'

export function index() {
    return createAxios({
        url: controllerUrl + 'index',
        method: 'get',
    })
}

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

export function monitorOptions1(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options1',
        data: params,
        method: method,
    }) as ApiPromise
}

export function getOperationData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options1/getOperationData',
        data: params,
        method: method,
    }) as ApiPromise
}

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

export function getPPData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2/getPPData',
        data: params,
        method: method,
    }) as ApiPromise
}

export function qualityOptions1(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'qualityPred/options1',
        data: params,
        method: method,
    }) as ApiPromise
}

export function runPredictModel(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'qualityPred/options1/runPredictModel',
        data: params,
        method: method,
    }) as ApiPromise
}

export function getMIData(method: 'get' | 'post', params: object = {}): ApiPromise {
    return createAxios({
        url: controllerUrl + 'monitor/options2/getMIData',
        data: params,
        method: method,
    }) as ApiPromise
}

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
