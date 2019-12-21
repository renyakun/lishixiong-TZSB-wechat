// pages/reportChange/reportChange.js
const {
  url
} = require('../../utils/url.js');

import {
  wxRequest,
  showToast,
  checkModel
} from '../../utils/WeChatfction.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [
      '使用单位',
      '单位地址',
      '联系人',
      '联系电话',
      '安全阀出厂编号',
      '安装位置',
      '安全阀类型',
      '安全阀型号',
      '工作介质',
      '执行标准',
      '检验方式',
      '检验介质',
      '工作压力',
      '要求整定压力',
      '整定压力',
      '密封试验压力',
      '检验结果',
      '备注',
      '维护检修情况说明',
      '其他',
    ]
  },

  // 获取报告信息
  getReportDetail(reportNo) {
    let cookie = getApp().globalData.cookie;
    // console.log(this.data.reportNo)
    let reportno = this.data.reportNo;
    wxRequest('GET', url + '/report/getReportDetail', {
      reportNo: reportno,
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        this.setData({
          reportDetail: res.data.data.reportInfo,
          commiterInfo: res.data.data.historyInfo
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      reportNo: options.reportNo,
      flag: options.flag,
    })

    this.getReportDetail();
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