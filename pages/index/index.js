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
    checkflag: true, //shehe 加载动画标志
    approveflag: true, // shepi 加载动画标志
    todayflag: true,
    nodataFlag: false, //无数据
    nodataFlag1: false,
    scrollLeft: 0,
    pageNum: 1, //页码
    pageSize: 10, //数据数量
    tabList: [
      "待审核",
      "待审批"
    ],
    checkList: [],
    reportList: [],
    ApproveList: [],
    checkRequestFlag: true, //上拉加载更多请求标志,请求不到数据停止下拉加载
    ApproveRequestFlag: true, //上拉加载更多请求标志,请求不到数据停止下拉加载
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
        setTimeout(() => {
          this.setData({
            reportList: res.data.data,
            todayflag: false
          })
        }, 1000)
      }
    }, (err) => {
      console.log(err)
    })

  },

  // 待审核报告列表
  getWaitCheckList() {
    let cookie = getApp().globalData.cookie;
    let pageNum = this.data.pageNum;
    let pageSize = this.data.pageSize;
    console.log(cookie);
    if (pageNum == 1) {
      // 首次加载或者下拉刷新
      wxRequest('GET', url + '/report/getWaitCheckList', {
        pageNum: pageNum,
        pageSize: pageSize
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          console.log(res.data.data.list.length);
          if (res.data.data.list.length < 1) {
            // 没有拿到数据
            setTimeout(() => {
              this.setData({
                checkList: [...this.data.checkList, ...res.data.data.list],
                checkRequestFlag: false, //上拉请求标志(停止上拉操作)
                checkflag: false,
                nodataFlag: true,
              })
            }, 1000)
          }else{
            setTimeout(() => {
              this.setData({
                checkList: [...this.data.checkList, ...res.data.data.list],
                checkflag: false,
              })
            }, 1000)
          }
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      // 加载更多
      wxRequest('GET', url + '/report/getWaitCheckList', {
        pageNum: pageNum,
        pageSize: pageSize
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          console.log(res.data.data.list.length);
          if (res.data.data.list.length < 1) {
            // 没有拿到数据
            this.setData({
              checkRequestFlag: false, //上拉请求标志(停止上拉操作)
            })
          }
          console.log("设置数据")
          setTimeout(() => {
            this.setData({
              checkList: [...this.data.checkList, ...res.data.data.list],
              checkflag: false,
            })
          }, 1000)
        }
      }, (err) => {
        console.log(err)
      })
    }

  },

  // 待审批报告列表
  getApproveList() {
    let cookie = getApp().globalData.cookie;
    let pageNum = this.data.pageNum;
    let pageSize = this.data.pageSize;
    console.log(cookie);
    if (pageNum == 1) {
      wxRequest('GET', url + '/report/getWaitApproveList', {
        pageNum: pageNum,
        pageSize: pageSize
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          if (res.data.data.list.length < 1) {
            setTimeout(() => {
              this.setData({
                ApproveList: [...this.data.ApproveList, ...res.data.data.list],
                approveflag: false,
                ApproveRequestFlag: false,
                nodataFlag1: true
              })
            }, 1000)
          }else{
            setTimeout(() => {
              this.setData({
                ApproveList: [...this.data.ApproveList, ...res.data.data.list],
                approveflag: false,
              })
            }, 1000)
          }
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      wxRequest('GET', url + '/report/getWaitApproveList', {
        pageNum: pageNum,
        pageSize: pageSize
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          if (res.data.data.list.length < 1) {
            this.setData({
              ApproveRequestFlag: false,
            })
          }
          console.log("设置数据")
          setTimeout(() => {
            this.setData({
              ApproveList: [...this.data.ApproveList, ...res.data.data.list],
              approveflag: false,
            })
          }, 1000)

        }
      }, (err) => {
        console.log(err)
      })
    }

  },

  // 跳转到任务详情页
  toReportInfo(e) {
    console.log(e);
    let reportNo = e.currentTarget.dataset.reportno;
    let flag = e.currentTarget.dataset.flag;
    console.log(reportNo);
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/reportList/newreport/info/info?reportNo=' + reportNo + '&flag=' + flag,
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

  // 下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    // 初始化数据
    this.setData({
      checkflag: true,
      approveflag: true,
      todayflag: true,
      pageNum: 1,
      pageSize: 10,
      checkList: [],
      reportList: [],
      ApproveList: [],
      nodataFlag: false,
      nodataFlag1: false,
      checkRequestFlag: true, 
      ApproveRequestFlag: true, 
    })
    this.getUserNotifyInfo();
    this.getWaitCheckList();
    this.getApproveList();
  },

  //监听上拉事件 
  onReachBottom() {
    console.log("123");
    let pageNum = this.data.pageNum + 1;
    this.setData({
      pageNum: pageNum
    })
    if (this.data.TabCur == 0) {
      if (this.data.checkRequestFlag) {
        this.getWaitCheckList();
      }
    } else {
      if (this.data.ApproveRequestFlag) {
        this.getApproveList();
      }
    }
  },
})