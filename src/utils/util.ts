import * as wepp from './wepp/wepp'

const hostName = 'http://localhost:3000'

/**
 * 获取时间戳
 */
const getTimeStamp = () => {
  const date = new Date()
  return Math.floor(date.getTime() / 1000)
}

/**
 * 获取随机数
 */
const getNonceStr = () => {
  return Math.random()
    .toString(26)
    .substr(2)
}

/**
 * 获取日期格式
 * @param date 指定日期
 */
const formatDate = (date: Date = new Date) => {
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

/**
 * 将秒数转换为时间
 * @param time 指定秒数
 */
const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time % 3600 / 60)
  const seconds = Math.floor(time % 3600 % 60)

  return [hours, minutes, seconds].map(formatNumber)
}

/**
 * number 格式化，单位数字前补0
 * @param n 数字
 */
const formatNumber = (n: number) => {
  const _n = n.toString()
  return _n[1] ? n : '0' + n
}

/**
 * v1.9.0+
 * 无 icon 版 toast 提示框
 * @param info 内容
 */
const toast = (info: string) => {
  wx.showToast({
    title: info,
    icon: 'none',
    duration: 1500,
  })
}

/**
 * 加载更多功能类型 (typescript)
 */
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
/**
 * 加载更多
 * @param param0 加载所需参数
 */
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
