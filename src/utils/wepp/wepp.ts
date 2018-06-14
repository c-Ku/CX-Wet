import * as wetype from './wepp.type'

function wxPromisify<RES>(wxMethod: any, extra?: Object) {
  return new Promise((resolve: (res: RES) => void, reject) => {
    wxMethod({ success: resolve, fail: reject, ...extra })
  })
}

/**
 * 网络
 */

// 发起请求
const request = (
  { api, path, data, header, method }: wetype.IRequestParam = {
    api: '',
    path: '',
    data: {},
    header: { 'Content-Type': 'json' },
    method: 'GET',
  },
): Promise<any> => {
  data = Object.assign({}, data)
  return wxPromisify<wetype.IHttpResponse>(wx.request, {
    url: `${api}/${path}`,
    data,
    header,
    method,
  })
}

/**
 * 数据存储
 */

const setStorage = (params: wetype.ISetStorage) => {
  return wxPromisify(wx.setStorage, params)
}
const getStorage = (params: wetype.IGetStorage) => {
  return wxPromisify(wx.getStorage, params)
}

/**
 * 位置
 */

// 获取位置
const getLocation = (params: wetype.IGetLocationParam) => {
  return wxPromisify<wetype.IGetLocation>(wx.getLocation, params)
}
const chooseLocation = () => {
  return wxPromisify<wetype.IChooseLocation>(wx.chooseLocation)
}

/**
 * 设备
 */

// 系统信息
const getSystemInfo = () => {
  return wxPromisify<wetype.ISystemInfo>(wx.getSystemInfo)
}

// 扫码
const scanCode = (
  { onlyFromCamera, scanType }: wetype.IScanCodeParam = {
    onlyFromCamera: false,
    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
  },
) => {
  return wxPromisify<wetype.IScanCode>(wx.scanCode, {
    onlyFromCamera,
    scanType,
  })
}

// 剪贴板
const setClipboardData = (params: wetype.ISetClipboardData) => {
  return wxPromisify(wx.setClipboardData, params)
}
const getClipboardData = () => {
  return wxPromisify(wx.getClipboardData)
}

// 设置
const getSetting = () => {
  return wxPromisify<wetype.ISetting>(wx.getSetting)
}

/**
 * 界面
 */

// 交互反馈
const showModal = (params: wetype.IShowModalParam) => {
  return wxPromisify(wx.showModal, params)
}

/**
 * 开放接口
 */

// 登录
const login = () => {
  return wxPromisify<wetype.ILoginResult>(wx.login)
}

// 用户信息
const getUserInfo = () => {
  return wxPromisify<wetype.IUserInfo>(wx.getUserInfo)
}

// 微信支付
const requestPayment = (params: wetype.IRequestPaymentParam) => {
  return wxPromisify(wx.requestPayment, params)
}

export {
  wxPromisify,
  request,
  setStorage,
  getStorage,
  login,
  getUserInfo,
  getSystemInfo,
  getSetting,
  getLocation,
  chooseLocation,
  scanCode,
  showModal,
  setClipboardData,
  getClipboardData,
  requestPayment,
}
