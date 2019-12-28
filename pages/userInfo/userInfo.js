// pages/userInfo/userInfo.js
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
    getUserInfo:[],
  },
  getUserInfo() {
    // /report/user/getuser
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/user/getuser', {

    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        setTimeout(() => {
          this.setData({
            getUserInfo: res.data.data,
          })
        }, 1000)
      }
    }, (err) => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo();
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