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
    checkflag: true, //审核 加载动画标志
    approveflag: true, // 审批 加载动画标志
    todayflag: true, //顶部加载动画
    nodataFlag: false, //审核列表无数据
    nodataFlag1: false, //审批列表无数据
    loadflag:false,
    loadflag1:false,
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
    },
    tiptxt: '到底了',
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
          if (pageNum <= 1) {
            // 首次加载或者下拉刷新没有数据
            this.setData({
              checkflag: false, //加载动画
              nodataFlag: true,
              checkRequestFlag: false,
            })
          } else {
            // 上拉加载更多没有数据
            this.setData({
              loadflag: true,
              checkRequestFlag: false, //上拉请求标志(停止上拉操作)
            })
          }
        }else{
          // 有数据
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
  },

  // 待审批报告列表
  getApproveList() {
    let cookie = getApp().globalData.cookie;
    let pageNum = this.data.pageNum;
    let pageSize = this.data.pageSize;
    console.log(cookie);
    wxRequest('GET', url + '/report/getWaitApproveList', {
      pageNum: pageNum,
      pageSize: pageSize
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        if (res.data.data.list.length < 1) {
          if (pageNum <= 1) {
            // 首次加载或者下拉刷新没有数据,显示nodata,停止动画
            setTimeout(() => {
              this.setData({
                approveflag: false,
                // ApproveRequestFlag: false,
                nodataFlag1: true
              })
            }, 1000)
          } else {
            // 加载更多没有数据显示底部样式栏
            setTimeout(() => {
              this.setData({
                loadflag1:true,
                ApproveRequestFlag: false,
              })
            }, 1000)
          }

        } else {
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
    // 刷新页面,初始化tab栏数据
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      pageNum:1,
      checkflag: true, 
      approveflag: true, 
      nodataFlag: false, 
      nodataFlag1: false, 
      loadflag: false,
      loadflag1: false,
      checkList: [],
      ApproveList: [],
      checkRequestFlag: true, 
      ApproveRequestFlag: true, 
    })
    this.getWaitCheckList();
    this.getApproveList();
  },


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
      todayflag: true,
      checkflag: true,
      loadflag: false,
      loadflag1: false,
      pageNum: 1,
      checkList: [],
      nodataFlag: false,
      nodataFlag1: false,

      approveflag: true,
      // pageSize: 10 ,
      reportList: [],
      ApproveList: [],

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
      pageNum: pageNum,
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