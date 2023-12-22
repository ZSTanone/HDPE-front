// 变量名对应含义请在 /stores/* 里边找
import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'

export interface Layout {
    showDrawer: boolean
    shrink: boolean
    layoutMode: string
    mainAnimation: string
    isDark: boolean
    menuWidth: number
    menuDefaultIcon: string
    menuCollapse: boolean
    menuUniqueOpened: boolean
    menuShowTopBar: boolean
    menuBackground: string[]
    menuColor: string[]
    menuActiveBackground: string[]
    menuActiveColor: string[]
    menuTopBarBackground: string[]
    headerBarTabColor: string[]
    headerBarBackground: string[]
    headerBarHoverBackground: string[]
    headerBarTabActiveBackground: string[]
    headerBarTabActiveColor: string[]
}

export interface NavTabs {
    activeIndex: number
    activeRoute: RouteLocationNormalized | null
    tabsView: RouteLocationNormalized[]
    tabFullScreen: boolean
    tabsViewRoutes: RouteRecordRaw[]
    authNode: Map<string, string[]>
}

export interface MemberCenter {
    open: boolean
    layoutMode: string
    activeRoute: RouteRecordRaw | RouteLocationNormalized | null
    viewRoutes: RouteRecordRaw[]
    showHeadline: boolean
    authNode: Map<string, string[]>
    shrink: boolean
    menuExpand: boolean
}

export interface AdminInfo {
    id: number
    username: string
    nickname: string
    avatar: string
    lastlogintime: string
    token: string
    refreshToken: string
    super: boolean
}

export interface UserInfo {
    id: number
    username: string
    avatar: string
    email: string
    mobile: string
    lastlogintime: string
    token: string
    refreshToken: string
}

export interface TaskItem {
    // 任务唯一标识
    uuid: string
    // 创建时间
    createtime: string
    // 状态
    status: number
    // 命令
    command: string
    // 命令执行日志
    message: string[]
    // 显示命令执行日志
    showMessage: boolean
    // 失败阻断后续命令执行
    blockOnFailure: boolean
    // 扩展信息，自动发送到后台
    extend: string
    // 执行结果回调
    callback: Function
}

export interface Terminal {
    show: boolean
    showDot: boolean
    taskList: TaskItem[]
    packageManager: string
    showPackageManagerDialog: boolean
    showConfig: boolean
    automaticCleanupTask: string
    port: string
}

// 网页设置的接口 用于状态仓库
export interface SiteConfig {
    site_name: string
    short_name: string
    record_number?: string
    version: string
    cdn_url: string
    api_url: string
    upload: {
        mode: string
        maxsize: number
        mimetype: string
        savename: string
        url?: string
        params?: anyObj
    }
}

// Ippdata的接口 用于状态仓库
export interface Ippdata {
    timeset: number
    timestamps: number
    id: number
    time?: string
    // 分子量分布的数据是以数组的形式给出
    Output_R201_MW?: number[]
    Output_R202_MW?: number[]
    TIC221: number
    PIC221: number
    FIC141: number
    FIC111: number
    FIC121: number
    FIC204: number
    TIC241: number
    PIC241: number
    FIC201A: number
    FIC201B: number
    FIC201C: number
    FIC203: number
    FIC201: number
    TIC251: number
    PIC251: number
    FIC202A: number
    FIC202B: number
    FIC202C: number
    FIC231: number
    FIC202: number
}

// 熔指数据类型的接口 用于状态仓库
export interface MIData {
    predict: {
        time: string
        value: number
    }
    real: {
        time: string
        value: number | null
    }
}

export interface HDPEdata {
    timeset: number
    timestamps: number
    id: number
    time: string

    FC41058: number
    FC41053: number
    FC41049: number
    FC30253: number
    FC30493: number
    FC41048: number

    FC42058: number
    FC42053: number
    FC42049: number
    FC30486: number
    FC42048: number

    Yield: number
}

export interface HDPEpara {
    timeset: number
    timestamps: number
    id: number
    time?: string

    //反应器1
    FC41058: number
    FC41053: number
    FC41049: number
    FC30253: number
    FC30493: number
    FC41048: number

    DI41162: number
    PI41186: number
    TI41164: number

    FC42058: number
    FC42053: number
    FC42049: number
    FC30486: number
    FC42048: number

    DI42162: number
    PI42186: number
    TI42164: number
}

// 用于保存仿真参数的状态仓库，用于仿真模拟页面
export interface SimPara {
    //反应器1
    // 乙烯  氢气  己烯  催化剂  助催化剂  新鲜异丁烷
    FC41058: number
    FC41053: number
    FC41049: number
    FC30253: number
    FC30493: number
    FC41048: number

    // 反应器2
    // 乙烯  氢气  己烯  助催化剂  新鲜异丁烷
    FC42058: number
    FC42053: number
    FC42049: number
    FC30486: number
    FC42048: number

    submit: boolean
}

// 高压闪蒸页面的参数
export interface Flash {
    // 数据标识
    id: number
    time?: string

    // 表格中的
    AI431581: number
    AI431581A: number
    AI431582: number
    AI431582A: number
    AI431583: number
    AI431583A: number
    AI431584: number
    AI431584A: number
    AI431585: number
    AI431585A: number
    AI431586: number
    AI431586A: number
    h2c2: number

    // 其余的
    PI43155: number
    TI43161A: number
    LZI43166A: number
    TI43156: number
    LZI43166B: number
    TI43152: number
    PI43153: number
    AI43157: number
}

// 王军的优化界面需要用到的仓库接口 6.16

export interface PPdata {
    timeset: number
    timestamps: number
    id: number
    time?: string
    devValue: string
    targetProduction: {
        均聚物产量: number
        总聚合产量: number
        共聚物产量: number
        总聚合乙烯含量: number
        共聚乙烯含量: number
        SCBaver: number
    }
    targetQuality: {
        Common_X: number[]
        R202MWD: number[]
        R401MWD: number[]
        copoMWD: number[]
        CCD_X: number[]
        CCD_Y: number[]
    }
    optQuality: {
        R202MWD: number[]
        R401MWD: number[]
        copoMWD: number[]
        CCD_Y: number[]
    }
    Production: {
        均聚物产量: number
        总聚合产量: number
        共聚物产量: number
        总聚合乙烯含量: number
        共聚乙烯含量: number
        SCBaver: number
    }
    optValue: {}
    MWW: {}
    PDI: {}
    Output_R201_MW: number[]
    Output_R202_MW: number[]
    Output_R401_MW?: number[]
    copo_MWD?: number[]
    WFA?: number[]
    TIC221: number
    PIC221: number
    FIC141: number
    FIC111: number
    FIC121: number
    FIC204: number
    TIC241: number
    PIC241: number
    FIC201A: number
    FIC201B: number
    FIC201C: number
    FIC203: number
    FIC201: number
    TIC251: number
    PIC251: number
    FIC202A: number
    FIC202B: number
    FIC202C: number
    FIC231: number
    FIC202: number
}
