// pages/login/login.js
const {
  url
} = require('../../utils/url.js');

import {
  showToast
} from '../../utils/WeChatfction.js';

const app = getApp()

Page({

  // 登录接口 跳转到主页
  login() {
    // 发送请求,执行登录校验
    console.log(1111);
    wx.request({
      url: url + "/report/user/login",
      data: {
        user: "admin",
        pwd: "e10adc3949ba59abbe56e057f20f883e"
      },
      header: {
        accept: "*/*",
        contentType: "application/json"
      },
      method: "POST",
      success: res => {
        getApp().globalData.cookie = 'JSESSIONID=' + res.data.data.sessionId;
        console.log(res.data.data.sessionId);
        showToast('登陆成功', null, 1000);
        if (res.data.ok) {
          this.setData({
            cookie: res.data.data.sessionId
          })
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/index/index"
            })
          }, 1000)
        }
      },
      fail: err => {
        console.log(err)
      }
    })


  },


  getUserName(e) {
    console.log(e.detail.value)
    this.setData({
      userName: e.detail.value
    })
  },
  getPassword(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: ''
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