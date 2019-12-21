// pages/reportList/checklist/checklist.js
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
    checkedReportList: []
  },

  // 审核报告列表
  getCheckedReportList() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getCheckedReportList  ', {}, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取数据成功")
        this.setData({
          checkedReportList: [...res.data.data.list, ...this.data.checkedReportList]
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 提交审核
  commit() {
    // wx.request({
    //   url: url + '/report/getCheckUserList',
    //   type:"GET",
    //   success:res=>{
    //     console.log(res)
    //     if(res.data.ok){
    // showToast("提交成功",null,1500)
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }, 1500)

    //     }
    //   },
    //   fail: err=>{
    //     console.log(err)
    //   }
    // })
    showToast("提交成功", null, 1500)
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }, 1500)
  },

  // 查看审核报告详情
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

  // 修改报告
  changeReport(e){
    let flag = e.currentTarget.dataset.flag;
    let reportNo = e.currentTarget.dataset.reportno;   //自定义属性名字只能小写
    // console.log(e.currentTarget.dataset.flag);
    // console.log(e.currentTarget.dataset.reportno);
    console.log("修改报告");
    showToast("推荐去pc端修改",null,1000)
    // wx.navigateTo({
    //   url: '/pages/reportChange/reportChange?flag=' + flag + '&reportNo=' + reportNo,
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheckedReportList();
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