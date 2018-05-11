import { amapLocation } from './utils/location'
import * as wxpp from './utils/wepp/wepp'

App({
  data: {
    name: 'test',
    version: '0.0.1',
  },
  async onLaunch() {
    wxpp.login()
    wxpp.getLocation('wgs84').then(async ({ longitude, latitude }: any) => {
      const locationInfo = await amapLocation(longitude, latitude)
      if (this.setLocationInfo) {
        this.setLocationInfo(locationInfo)
      } else {
        this.globalData.locationInfo = locationInfo
      }
    })
  },
  globalData: {
    locationInfo: null,
  },
})
