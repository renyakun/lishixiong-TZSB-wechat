// pages/reportList/newreport/newreport.js
const {
  url
} = require('../../../utils/url.js');

import {
  showToast
} from "../../../utils/WeChatfction.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false
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
    showToast("提交成功",null,1500)
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: '',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }, 1500)
  },

  // 查看报告详情
  newReportInfo() {
    wx.navigateTo({
      url: '/pages/reportList/newreport/info/info',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})