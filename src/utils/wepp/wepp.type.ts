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

export interface ILocationInfo {
  latitude: number
  longitude: number
  speed: number
  accuracy: number
  altitude: number
  verticalAccuracy: number
  horizontalAccuracy: number
}

export interface IHttpResponse {
  data?: Object | string | ArrayBuffer
  errMsg: string
  statusCode: number
  header?: Object
}
