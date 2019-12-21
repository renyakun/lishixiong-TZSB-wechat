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
    fileReportList: []
  },

  // 审批报告列表
  getFileReportList() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getFileReportList', {
      pageNum:1,
      pageSize:10
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取数据成功")
        this.setData({
          fileReportList: [...res.data.data.list, ...this.data.fileReportList]
        })
      }
    }, (err) => {
      console.log(err)
    })
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
    this.getFileReportList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})