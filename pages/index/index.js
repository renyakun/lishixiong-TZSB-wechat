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
    reportList:[]
  },

  // 获取今日报告数量
  // GET /report/getUserNotifyInfo
  getUserNotifyInfo(){
    // wxRequest(method, url, data, cookie, callback, errFun )
    let cookie = getApp().globalData.cookie;
    console.log(cookie);
    wxRequest('GET',url + '/report/getUserNotifyInfo', {}, cookie,(res)=>{
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          reportList: res.data.data
        })
      }
    },(err)=>{
      console.log(err)
    })

  },

  // 待审核报告列表
  getWaitCheckList(){
    let cookie = getApp().globalData.cookie;
    console.log(cookie);
    wxRequest('GET', url + '/report/getWaitCheckList', {
      pageNum:1,
      pageSize:10
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          checkList: res.data.data
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // tab栏切换
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onLoad: function() {
    this.getUserNotifyInfo();
    this.getWaitCheckList();
  },

})