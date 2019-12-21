// pages/info/info.js

const {
  url
} = require('../../../../utils/url.js');

import {
  wxRequest,
  showToast,
  checkModel
} from '../../../../utils/WeChatfction.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    reportDetail: [], //报告详情
    commiterInfo: [], //提交人的信息  
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
    picker: [], //底部选择框审核人列表
    picker1: [], //底部选择框审批人列表
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

  //获取审核人列表
  getCheckUserList() {
    console.log("获取提交人列表")
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getCheckUserList', {
      // reportNo: reportNo,
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        let arr = res.data.data;
        let arr1 = arr.map((item, index) => {
          return item.userName
        })
        console.log(arr1);
        this.setData({
          checkUserList: res.data.data,
          picker: arr1
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 提交审核|审批
  commit(e) {
    let cookie = getApp().globalData.cookie;
    let flag = e.currentTarget.dataset.flag;
    console.log(flag);
    if (flag == 0) {
      // 审核
      checkModel("提示", "确认通过吗", () => {
        console.log("确认通过");
        wxRequest('POST', url + '/report/addNotifyCheckUser', {
          reportNo: this.data.reportNo,
          userName: this.data.checkman,
        }, cookie, (res) => {
          console.log(res.data.data)
          if (res.data.ok) {
            console.log("提交审核成功")
            showToast('提交成功', null, 1000)
          } else {
            console.log(res.data.errMsg)
            showToast(res.data.errMsg, null, 1000)
          }
        }, (err) => {
          console.log(err)
        })
      }, (fail) => {
        console.log("取消")
      })
    } else if (flag == 2) {
      // 审批
      checkModel("提示", "确认通过吗", () => {
        console.log("确认通过");
        wxRequest('POST', url + '/report/addNotifyApproveUser', {
          reportNo: this.data.reportNo,
          userName: this.data.checkman,
        }, cookie, (res) => {
          console.log(res.data.data)
          if (res.data.ok) {
            console.log("提交审批成功")
            showToast('提交成功', null, 1000)
          } else {
            console.log(res.data.errMsg)
            showToast(res.data.errMsg, null, 1000)
          }
        }, (err) => {
          console.log(err)
        })
      }, (fail) => {
        console.log("取消")
      })
    } else if (flag == 4) {
      // 归档
      checkModel("提示", "确认通过吗", () => {
        console.log("确认通过");
        wxRequest('POST', url + '/report/addFileReport', {
          reportNo: this.data.reportNo,
        }, cookie, (res) => {
          console.log(res.data.data)
          if (res.data.ok) {
            console.log("提交归档成功")
            showToast('提交成功', null, 1000)
          } else {
            console.log(res.data.errMsg)
            showToast(res.data.errMsg, null, 1000)
          }
        }, (err) => {
          console.log(err)
        })
      }, (fail) => {
        console.log("取消")
      })
    }

  },


  //获取审批人列表
  getApproveUserList() {
    console.log("获取提交人列表")
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getApproveUserList', {
      // reportNo: reportNo,
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        let arr = res.data.data;
        let arr1 = arr.map((item, index) => {
          return item.userName
        })
        console.log(arr1);
        this.setData({
          approveUserList: res.data.data,
          picker1: arr1
        })
      }
    }, (err) => {
      console.log(err)
    })
  },



  // 选择框value改变触发 (审核)
  PickerChange(e) {
    console.log(e);
    // 设置选择框的值
    this.setData({
      index: e.detail.value,
      checkman: this.data.picker[e.detail.value]
    })
  },

  // 审批
  PickerChange1(e) {
    console.log(e);
    // 设置选择框的值
    this.setData({
      index: e.detail.value,
      checkman: this.data.picker1[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    if (options.flag == 3 || options.flag == 2) {
      this.setData({
        basics: 2,
      })
    } else if (options.flag == 1 || options.flag == 0) {
      this.setData({
        basics: 1,
      })
    } else if (options.flag == 4) {
      this.setData({
        basics: 3,
      })
    } else if (options.flag == 5) {
      this.setData({
        basics: 4,
      })
    }
    this.setData({
      reportNo: options.reportNo,
      flag: options.flag,
    })
    // 报告信息
    this.getReportDetail(options.reportNo);

    // 审核
    this.getCheckUserList();

    // 审批
    this.getApproveUserList(options.reportNo);
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