// pages/reportDetail/reportDetail.js

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
    reportDetail: [], //报告详情
    commiterInfo: [], //提交人的信息  
    falg:'',
    basicsList: [{ //进度条数据
      icon: 'usefullfill',
      name: '新建报告'
    }, {
      icon: 'radioboxfill',
      name: '审核报告'
    }, {
      icon: 'roundclosefill',
      name: '审批报告'
    }, {
      icon: 'roundcheckfill',
      name: '归档报告'
    }, ],
    basics: 0,
    imgUrl: '', //电子签名地址
  },
  // 动态修改流程状态
  // basicsSteps() {
  //   this.setData({
  //     basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
  //   })
  // },


  // 获取报告详情
  getReportDetail(reportNo) {
    let cookie = getApp().globalData.cookie;
    // console.log(cookie)
    // console.log(reportNo)
    // console.log(url)
    wxRequest('GET', url + '/report/getReportDetail', {
      reportNo: reportNo,
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

  // 查看个人信息详情
  getSignature() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/user/getuser', {}, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        this.setData({
          imgUrl: res.data.data.signatureUrl
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 通过审核|审批
  pass(e) {
    let cookie = getApp().globalData.cookie;
    console.log(this.data.imgUrl)
    console.log(this.data.reportNo)
    checkModel("提示", "确认通过吗", () => {
      console.log("确认通过");
      wxRequest('POST', url + '/report/checkResult', {
        checkSignature: this.data.imgUrl, //调接口拿
        flag: 2, //2通过  12不通过
        reason: "",
        reportNo: this.data.reportNo,
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          console.log("通过审核")
          showToast('提交成功', null, 1000)
        }
      }, () => {
        console.log(err)
      })
    }, (fail) => {

    })

  },


  // 获取驳回原因
  refusereason: function(e) {
    console.log(e);
    this.setData({
      reason: e.detail.value
    })
  },
  // 驳回确认
  popupConfirm() {
    let cookie = getApp().globalData.cookie;
    let reason = this.data.reason;
    if (!reason) {
      showToast('理由不能为空', null, 1000)
    } else {
      // 发送请求
      wxRequest('POST', url + '/report/checkResult', {
        checkSignature: this.data.imgUrl, //调接口拿
        flag: 12, //2通过  12不通过
        reason: reason, //理由
        reportNo: this.data.reportNo,
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          console.log("驳回成功")
          this.inputmodal.hide();
          setTimeout(()=>{
            showToast('驳回成功',null,1000)
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },

  // 驳回取消
  popupCancel() {
    this.inputmodal.hide();
  },
  // 驳回
  refuse(e) {
    this.inputmodal.show();

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.flag==3){
      this.setData({
        basics: 2,
      })
    } else if (options.flag == 1){
      this.setData({
        basics: 1,
      })
    }
    if (options.flag==99){
      // 从搜索页面跳转进来
    }
    this.setData({
      reportNo: options.reportNo,
      flag : options.flag,
    })
    this.getReportDetail(options.reportNo);
    this.getSignature();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 拿到模态框实例
    this.inputmodal = this.selectComponent('#popup');
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