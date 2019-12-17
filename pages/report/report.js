// pages/report/report.js

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
      
    ]
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