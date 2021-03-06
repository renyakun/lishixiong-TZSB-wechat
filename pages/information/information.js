// pages/information/information.js
const {
  url
} = require('../../utils/url.js');

import {
  wxRequest,
  showToast,
  checkModel,
  showLoading
} from '../../utils/WeChatfction.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  userInfo(){
    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  changeUserInfo(){
    wx.navigateTo({
      url: '/pages/setting/setting',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  companyInfo(){
    showToast("暂未开放,敬请期待",'none',1000)
  },
  userList(){
    showToast("暂未开放,敬请期待", 'none', 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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