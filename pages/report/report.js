// pages/report/report.js
const {
  url
} = require('../../utils/url.js');
import {
  showToast,
  navigateTo,
  wxRequest
} from '../../utils/WeChatfction';
import * as echarts from '../../my-component/ec-canvas/echarts.min.js';

function initChart(canvas, width, height, that) {
  console.log(that.data);

  // 需要展示的数据
  let newReportNum = parseInt(that.data.todayReportList.newReportNum);
  let checkReportNum = parseInt(that.data.todayReportList.checkReportNum);
  let aprroveReportNum = parseInt(that.data.todayReportList.aprroveReportNum);
  let fileReportNum = parseInt(that.data.reportList.fileReportNum);

  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE"],
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
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
    reportList: [{
        id: 0,
        name: "新建报告",
        imgUrl: "../../images/report/new.png"
      },
      {
        id: 1,
        name: "审核报告",
        imgUrl: "../../images/report/checkone.png"
      },
      {
        id: 2,
        name: "审批报告",
        imgUrl: "../../images/report/checktwo.png"
      },
      {
        id: 3,
        name: "归档报告",
        imgUrl: "../../images/report/done.png"
      },
    ],
    ec: {},
    todayReportList: [],
    echarsFlag: true,
    todayflag:true,
  },
  reportInfo(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '/pages/reportList/newreport/newreport'
        });
        return;
      case 1:
        wx.navigateTo({
          url: '/pages/reportList/checklist/checklist'
        });
        return;
      case 2:
        wx.navigateTo({
          url: '/pages/reportList/approvelist/approvelist'
        });
        return;
      case 3:
        wx.navigateTo({
          url: '/pages/reportList/archivelist/archivelist'
        });
        return;
    }
  },

  // 今日报告记录
  getTodayBotify() {
    let cookie = getApp().globalData.cookie;
    // let checkReportNum=0;
    wxRequest('GET', url + '/report/getTodayNotify', {}, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("设置数据", )
        let {
          aprroveReportNum,
          checkReportNum,
          fileReportNum,
          newReportNum
        } = res.data.data;
        
        let totalNum = aprroveReportNum + checkReportNum + fileReportNum + newReportNum;
        console.log(totalNum);
        if (totalNum == 0){
          setTimeout(()=>{
            this.setData({
              totalNum: totalNum,
              numFlag: false,
              todayflag: false
            })
          },1000)
        }else{
          setTimeout(() => {
            this.setData({
              totalNum: totalNum,
              numFlag: true,
              todayflag: false
            })
          },1000)   
        }
        console.log(checkReportNum);
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
  onLoad: function(options) {
    this.getTodayBotify();
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