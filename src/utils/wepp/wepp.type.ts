export interface IRequestParam {
  api: string
  path: string
  data?: any
  header?: any
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
}
export interface IHttpResponse {
  data?: Object | string | ArrayBuffer
  errMsg: string
  statusCode: number
  header?: Object
}

export interface ILoginResult {
  errMsg: string
  code: string
}

export interface IUserInfo {
  encryptedData: string
  errMsg: string
  iv: string
  rawData: string
  signature: string
  userInfo: {
    avatarUrl: string
    city: string
    country: string
    gender: number
    language: string
    nickName: string
    province: string
  }
}

export interface ISystemInfo {
  brand: string
  model: string
  pixelRatio: string
  windowWidth: string
  windowHeight: string
  language: string
  version: string
  system: string
  platform: string
  screenWidth: string
  screenHeight: string
  fontSizeSetting: string
  SDKVersion: string
}

export interface ISetting {
  'scope.userInfo': boolean
  'scope.userLocation': boolean
  'scope.address': boolean
  'scope.record': boolean
  'scope.writePhotosAlbum': boolean
}

export interface ISetStorage {
  key: string
  data: string
}

export interface IGetStorage {
  key: string
}

export interface IGetLocationParam {
  type?: 'wgs84' | 'gcj02'
  altitude?: boolean
}
export interface IGetLocation {
  latitude: number
  longitude: number
  speed: number
  accuracy: number
  altitude: number
  verticalAccuracy: number
  horizontalAccuracy: number
}
export interface IChooseLocation {
  name: string
  address: string
  latitude: number
  longitude: number
}

export interface IScanCodeParam {
  onlyFromCamera?: boolean
  scanType?: Array<string>
}
export interface IScanCode {
  result: string
  scaqnType: string
  charSet: string
  path: string
}

export interface IShowModalParam {
  title: string
  content: string
  showCancel?: boolean
  cancelText?: string
  cancelColor?: string
  confirmText?: string
  confirmColor?: string
}

export interface ISetClipboardData {
  data: string
}

export interface IRequestPaymentParam {
  timeStamp: string
  nonceStr: string
  package: string
  signType: 'MD5'
  paySign: string
}
