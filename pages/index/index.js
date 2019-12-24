//index.js
//获取应用实例
const {
  url
} = require('../../utils/url.js');
import {
  showToast,
  navigateTo,
  wxRequest
} from '../../utils/WeChatfction';

// echars
// import * as echarts from '../../my-component/ec-canvas/echarts.js';


const app = getApp()
const cookie = getApp().globalData.cookie;



Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tabList: [
      "待审核",
      "待审批"
    ],
    reportList: [],
    ApproveList: [],
    ec: {
      lazyLoad: true
    }
  },

  // 获取今日报告数量
  // GET /report/getUserNotifyInfo
  getUserNotifyInfo() {
    // wxRequest(method, url, data, cookie, callback, errFun )
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getUserNotifyInfo', {}, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          reportList: res.data.data
        })
      }
    }, (err) => {
      console.log(err)
    })

  },

  // 待审核报告列表
  getWaitCheckList() {
    let cookie = getApp().globalData.cookie;
    console.log(cookie);
    wxRequest('GET', url + '/report/getWaitCheckList', {
      pageNum: 1,
      pageSize: 10
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          checkList: res.data.data.list
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 待审批报告列表
  getApproveList() {
    let cookie = getApp().globalData.cookie;
    console.log(cookie);
    wxRequest('GET', url + '/report/getWaitApproveList', {
      pageNum: 1,
      pageSize: 10
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          ApproveList: res.data.data.list
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 跳转到任务详情页
  toReportInfo(e) {
    console.log(e);
    let reportNo = e.currentTarget.dataset.reportno;
    let flag = e.currentTarget.dataset.flag;
    console.log(reportNo);
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/reportDetail/reportDetail?reportNo=' + reportNo + '&flag=' + flag,
      })
    }, 1000)

  },

  // tab栏切换
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  // 初始化饼图
  // echartInit(e) {
  //   let that = this;
  //   initChart(e.detail.canvas, e.detail.width, e.detail.height, that);
  // },

  onLoad: function() {
    this.getUserNotifyInfo();
    this.getWaitCheckList();
    this.getApproveList();
  },


})