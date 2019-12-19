// pages/report/report.js
const {
  url
} = require('../../utils/url.js');
import {
  showToast,
  navigateTo,
  wxRequest
} from '../../utils/WeChatfction';
import * as echarts from '../../my-component/ec-canvas/echarts.js';

function initChart(canvas, width, height, that) {
  console.log(that.data);

  // 需要展示的数据
  let newReportNum = that.data.todayReportList.newReportNum;
  let checkReportNum = that.data.todayReportList.checkReportNum;
  let aprroveReportNum = that.data.todayReportList.aprroveReportNum;
  let fileReportNum = that.data.reportList.fileReportNum;

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: newReportNum,
        name: '新建报告'
      }, {
          value: checkReportNum,
        name: '审核报告'
        }, {
          value: aprroveReportNum,
          name: '审批报告'
        }, {
          value: fileReportNum,
          name: '归档报告'
        }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList:[
      {
        id:0,
        name: "新建报告",
        imgUrl: "../../images/report/new.png"
      },
      {
        id:1,
        name: "审核报告",
        imgUrl: "../../images/report/checkone.png"
      },
      {
        id:2,
        name: "审批报告",
        imgUrl: "../../images/report/checktwo.png"
      },
      {
        id:3,
        name: "归档报告",
        imgUrl: "../../images/report/done.png"
      },  
    ],
    ec: {},
    todayReportList:[]
  },
  reportInfo(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    switch(id){
      case 0 : wx.navigateTo({
        url: '/pages/reportList/newreport/newreport'
      }) ;
      case 1: wx.navigateTo({
        url: '/pages/reportList/checklist/checklist'
      });
      case 2: wx.navigateTo({
        url: '/pages/reportList/approvelist/approvelist'
      });
      case 3: wx.navigateTo({
        url: '/pages/reportList/archivelist/archivelist'
      });
      
    }
  },

  // 今日报告记录
  getTodayBotify(){
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/getTodayNotify', {}, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据")
        this.setData({
          todayReportList: res.data.data
        })
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 初始化饼图
  echartInit(e) {
    let that = this;
    initChart(e.detail.canvas, e.detail.width, e.detail.height, that);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTodayBotify();
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