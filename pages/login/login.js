// pages/login/login.js
const {
  url
} = require('../../utils/url.js');

import {
  showToast
} from '../../utils/WeChatfction.js';


const utilMd5 = require('../../utils/md5.js');

const app = getApp()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    pwd: '',
    loginBtnTxt: '登录', //登录按钮上的文字
    loginBtnBgBgColor: '#ff9900', //初始时背景颜色，点击后变为灰色
    btnLoading: false, //控制登录按钮点击后是否显示loading效果
    disabled: false //登录中，按钮不能点击
  },

  formSubmit(e) {
    let userInfo = e.detail.value;
    this.checkLogin(userInfo);
    // if (user.length < 0) {
    //   showToast('请输入用户名', 'none', 1000);
    // } else if (pwd.length < 0) {
    //   showToast('密码不能为空', 'none', 1000);
    // } else {

  },

  checkLogin(param) {
    console.log(param);
    let user = param.admin.trim();
    let pwd = param.pwd.trim();
    console.log(user.length)
    console.log(typeof(user.length))
    if (user.length == 0) {
      console.log('123')
      showToast('请输入用户名', 'none', 1000);
    } else if (pwd.length == 0) {
      showToast('密码不能为空', 'none', 1000);
    } else {
      this.login(param);
    }
  },

  login(param) {
    let user = param.admin.trim();
    let pwd = utilMd5.hexMD5(param.pwd.trim());
    wx.request({
      url: url + "/report/user/login",
      data: {
        user: user,
        pwd: pwd
      },
      header: {
        accept: "*/*",
        contentType: "application/json"
      },
      method: "POST",
      success: res => {
        if (res.data.ok) {
          showToast('登陆成功', 'none', 1000);
          getApp().globalData.cookie = 'JSESSIONID=' + res.data.data.sessionId;
          this.setData({
            cookie: res.data.data.sessionId
          })
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/index/index"
            })
          }, 1000)
        } else {
          console.log(res.data.errMsg);
          showToast(res.data.errMsg, 'none', 1000);
        }
      },
      fail: err => {
        console.log(err);
      }
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