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

const setStorage = ({ key, data }: wetype.ISetStorage) => {
  return wxPromisify(wx.setStorage, { key, data })
}
const getStorage = ({ key }: wetype.IGetStorage) => {
  return wxPromisify(wx.getStorage, { key })
}

/**
 * 位置
 */

// 获取位置
const getLocation = ({ type, altitude }: wetype.IGetLocationParam) => {
  return wxPromisify<wetype.IGetLocation>(wx.getLocation, { type, altitude })
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
const setClipboardData = ({ data }: wetype.ISetClipboardData) => {
  return wxPromisify(wx.setClipboardData, { data })
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
const showModal = ({ title, content }: wetype.IShowModalParam) => {
  return wxPromisify(wx.showModal, { title, content })
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
}
