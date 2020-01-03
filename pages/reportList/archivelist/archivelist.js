// pages/reportList/archivelist/archivelist.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast,
  navigateTo,
  wxRequest
} from "../../../utils/WeChatfction.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false,
    fileReportList: [],
    pageNum: 2,
    demandflag: true,
    dataflag: true,
  },

  demand(cookie, website, list, txt, pageNum) {
    if (this.data.tiptxt != '到底了') { }
    console.log(cookie, website, list, txt, pageNum)
    wxRequest('GET', url + website, {
      pageNum: pageNum,
      pageSize: 10
    }, cookie,
      (res) => {
        if (pageNum <= 1) {
          // 首次请求,下拉刷新
          let demand = res.data.data.list;
          console.log(txt, demand, demand.length, 'page:', pageNum);
          if (res.data.ok) {
            if (demand.length != 0) {
              // 有数据
              this.setData({
                [list]: demand,
                dataflag: true,
                demandflag: false,
              })
            } else {
              // 无数据
              this.setData({
                demandflag: false,
                dataflag: false,
                loadplay: false,
              })
            }
          } else {
            showToast(res.data.msg, 'none', 1000)
          }
        } else {
          // 加载更多
          let demands = res.data.data.list;
          console.log(txt, demands, demands.length, 'page:', pageNum);
          let demand = this.data.fileReportList;
          console.log('加载数据', txt, demand)
          if (demands.length != 0) {
            if (res.data.ok) {
              if (demands.length != 0) {
                showToast('加载数据中...', 'none', 500);
                demand.push(...demands)
                this.setData({
                  [list]: demand,
                  dataflag: true,
                  demandflag: false,
                  loadplay: false,
                })
              } else {
                this.setData({
                  demandflag: false,
                  dataflag: false,
                })
              }
            } else {
              showToast(res.data.msg, 'none', 1000)
            }
          } else {
            // 加载更多无数据
            this.setData({
              tiptxt: '到底了',
              loadplay: true,
            })
          }
        }
      }, (err) => {
        console.log(err)
      }
    )
  },

  // 审批报告列表
  getFileReportList(pageNum) {
    let cookie = getApp().globalData.cookie;
    let website = '/report/getFileReportList'; 
    let list = 'fileReportList';
    let txt = '请求审批报告列表';
    setTimeout(() => {
      this.demand(cookie, website, list, txt, pageNum);
    }, 500)
    // let cookie = getApp().globalData.cookie;
    // wxRequest('GET', url + '/report/getFileReportList', {
    //   pageNum:1,
    //   pageSize:10
    // }, cookie, (res) => {
    //   console.log(res.data.data)
    //   if (res.data.ok) {
    //     console.log("获取数据成功")
    //     this.setData({
    //       fileReportList: [...res.data.data.list, ...this.data.fileReportList]
    //     })
    //   }
    // }, (err) => {
    //   console.log(err)
    // })
  },



  // 查看审批报告详情
  newReportInfo(e) {
    let flag = e.currentTarget.dataset.flag;
    let reportNo = e.currentTarget.dataset.reportno;   //自定义属性名字只能小写
    // console.log(e.currentTarget.dataset.flag);
    // console.log(e.currentTarget.dataset.reportno);
    wx.navigateTo({
      url: '/pages/reportList/newreport/info/info?flag=' + flag + '&reportNo=' + reportNo,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getFileReportList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let pageNum = this.data.pageNum - 1;
    this.getFileReportList(pageNum)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNum: 2,
      fileReportList: [],
      demandflag: true,
      tiptxt: '',
      loadplay: false
    })
    this.onReady()
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNum = this.data.pageNum++;
    this.getFileReportList(pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})