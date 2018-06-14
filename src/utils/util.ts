import * as wepp from './wepp/wepp'

const hostName = 'http://localhost:3000'

const getTimeStamp = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}

const getNonceStr = () => {
  return Math.random()
    .toString(26)
    .substr(2)
}

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor((time % 3600) % 60)

  return [hours, minutes, seconds].map(formatNumber)
}

const formatNumber = (n: number) => {
  const _n = n.toString()
  return _n[1] ? n : '0' + n
}

const toast = (info: string) => {
  wx.showToast({
    title: info,
    icon: 'none',
    duration: 1500,
  })
}

type ILoadMoreResult =
  | {
      newList: Array<any>
      newNextPage: number
    }
  | undefined

type ILoadMoreParam = {
  path: string
  data: { [name: string]: any }
  oldList: Array<any>
}

const loadMore: (
  data: ILoadMoreParam,
) => Promise<ILoadMoreResult> = async function({ path, data, oldList }) {
  try {
    let request = await wepp.request({
      api: hostName,
      path,
      data,
    })
    const newNextPage =
      request.data.length === data['_limit'] ? data['_page'] + 1 : 0
    const newList = oldList.concat(request.data)
    return { newList, newNextPage }
  } catch (err) {
    toast(err.errMsg)
  }
  return
}

export {
  getTimeStamp,
  getNonceStr,
  formatDate,
  formatTime,
  formatNumber,
  toast,
  loadMore,
}
