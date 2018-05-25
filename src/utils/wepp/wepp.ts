import * as wetype from './wepp.type'

function wxPromisify<RES>(wxMethod: any, extra?: Object) {
  return new Promise((resolve: (res: RES) => void, reject) => {
    wxMethod({ success: resolve, fail: reject, ...extra })
  })
}

const login = () => {
  return wxPromisify<wetype.ILoginResult>(wx.login)
}

const getUserInfo = () => {
  return wxPromisify<wetype.IUserInfo>(wx.getUserInfo)
}

const getSystemInfo = () => {
  return wxPromisify<wetype.ISystemInfo>(wx.getSystemInfo)
}

const getSetting = () => {
  return wxPromisify<wetype.ISetting>(wx.getSetting)
}

const setStorage = ({ key, data }: wetype.ISetStorage) => {
  return wxPromisify(wx.setStorage, { key, data })
}

const getStorage = ({ key }: wetype.IGetStorage) => {
  return wxPromisify(wx.getStorage, { key })
}

const getLocation = ({ type, altitude }: wetype.IGetLocationParam) => {
  return wxPromisify<wetype.ILocationInfo>(wx.getLocation, { type, altitude })
}

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

const showModal = ({ title, content }: wetype.IShowModalParam) => {
  return wxPromisify(wx.showModal, { title, content })
}

export {
  wxPromisify,
  login,
  getUserInfo,
  getSystemInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  request,
  scanCode,
  showModal,
}
