/**
 * 08/05/2018
 * 高德地理位置api c-Ku
 */
import * as wepp from './wepp/wepp'

const api: string = 'https://restapi.amap.com'
const path: string = 'v3/geocode/regeo'

export interface ILocations {
  country: string
  province: string
  city: Array<string>
  district: string
  township: string
  address: string
}

const amapLocation = (
  long = 116.481028,
  lati = 39.997481,
  key = '01513f1b68a82deef6c41c32aadb95f0',
): Promise<ILocations> => {
  const data = {
    key,
    location: `${long},${lati}`,
    extensions: 'base',
    output: 'json',
    roadlevel: 0,
  }
  return wepp.request({ api, path, data }).then((res: any) => ({
    country: res.data.regeocode.addressComponent.country,
    province: res.data.regeocode.addressComponent.province,
    city: res.data.regeocode.addressComponent.city,
    district: res.data.regeocode.addressComponent.district,
    township: res.data.regeocode.addressComponent.township,
    address: res.data.regeocode.formatted_address,
  }))
}

export { amapLocation }
