import {
  IHttpResponse,
  ILocationInfo,
  ILoginResult,
  ISetting,
  ISystemInfo,
  IUserInfo,
} from './wepp.type'

function wxPromisify<RES>(wxMethod: any, extra?: Object) {
  return new Promise((resolve: (res: RES) => void, reject) => {
    wxMethod({ success: resolve, fail: reject, ...extra })
  })
}

const login = () => {
  return wxPromisify<ILoginResult>(wx.login)
}

const getUserInfo = () => {
  return wxPromisify<IUserInfo>(wx.getUserInfo)
}

const getSystemInfo = () => {
  return wxPromisify<ISystemInfo>(wx.getSystemInfo)
}

const getSetting = () => {
  return wxPromisify<ISetting>(wx.getSetting)
}

const setStorage = (key: string, data: string) => {
  return wxPromisify(wx.setStorage, { key, data })
}

const getStorage = (key: string) => {
  return wxPromisify(wx.getStorage, { key })
}

const getLocation = (type: string) => {
  return wxPromisify<ILocationInfo>(wx.getLocation, { type })
}

const request = (api: string, path: string, params: any): Promise<any> => {
  const data: { [name: string]: string } = {}

  Object.keys(params).forEach(key => {
    data[key] = params[key]
  })

  return wxPromisify<IHttpResponse>(wx.request, {
    url: `${api}/${path}`,
    data,
    header: { 'Content-Type': 'json' },
  })
}

export {
  wxPromisify,
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  request,
}
