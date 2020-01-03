// pages/search/search.js


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
  // 获取报告列表
  getList() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/list', {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        if(res.data.data.list.length<1){
          if (this.data.pageNum == '1'){
            // 首次加载没有数据||下拉刷新 show nodata
            this.setData({
              nodataFlag: true
            })
          }else{
            // 没有更多
            this.setData({
              loadflag: true
            })
          }
        }
        console.log("获取详情数据成功")
        setTimeout(() => {
          this.setData({
            list: [...this.data.list, ...res.data.data.list],
            todayflag: false,
            selectedflag: '0',
          })
        }, 1000)

      }else{
        showToast(res.data.errMsg,'none',1000)
      }
    }, (err) => {
      console.log(err)
    })
  },
  show() {
    this.setData({
      showFlag: true
    })
  },

  true(){
    return false;
  },

  // 获取处理人列表
  getPreUser() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/preUser', {

    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        let arr = res.data.data.map((item, index) => {
          return {
            id: index,
            title: item
          }
        })
        console.log(arr);
        setTimeout(() => {
          this.setData({
            data2: [...arr, {
              id: arr.length,
              title: '全部处理人',
            }],
          })
        }, 1000)
      }
    }, (err) => {
      console.log(err)
    })
  },

  // 报告筛选
  serachReport() {
    let cookie = getApp().globalData.cookie;
    wxRequest('GET', url + '/report/list', {
      pageNum: this.data.pageNum1,
      pageSize: this.data.pageSize1,
      reportNo: this.data.reportNo,
      userName: this.data.name,
      flag: this.data.flag,
    }, cookie, (res) => {
      console.log(res.data.data)
      if (res.data.ok) {
        console.log("获取详情数据成功")
        if(res.data.data.list.length<1){
          // 没有数据
          if(this.data.pageNum1=='1'){
            this.setData({
              nodataFlag: true
            })
          } else {
            // 下拉没有更多数据,底部显示
            this.setData({
              loadflag: true
            })
          }
        }else{
          setTimeout(() => {
            this.setData({
              serachList: res.data.data,
              list: [...this.data.list, ...res.data.data.list],
              selectedflag: '1',
              nodataFlag: false,
            })
          }, 1000)
        }   
      }
    }, (err) => {
      console.log(err)
    })
  },


  reset() {
    // 刷新页面
    this.setData({
      data2: [],
      data3: []
    })
    this.onLoad();
  },
  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    flag: '',
    reportNo: '',
    pageNum: 1, //页码
    pageSize: 10, //条数
    pageNum1: 1, //页码
    pageSize1: 10, //条数
    list: [], //报告列表
    fixedflag: true,
    todayflag: true,  //加载动画标志
    showFlag: false,
    nodataFlag:false, //没有数据标志
    selectedflag: '0', //所有列表,筛选状态 flag  0 全部, 1,筛选状态  加载更多使用

    loadflag:false, //到底标志
    tiptxt:'到底了',
    name: '', //筛选名称 
    status: '', //状态筛选
    sourceopen: '', //
    CustomBar: app.globalData.CustomBar,
    dropDownMenuTitle: ['', '全部处理人', '全部状态', ''],
    data2: [],
    data3: [{
        id: 1,
        title: '待审核'
      },
      {
        id: 2,
        title: '审核通过'
      },
      {
        id: 3,
        title: '待审批'
      },
      {
        id: 4,
        title: '审批通过'
      },
      {
        id: 5,
        title: '报告归档'
      },
      {
        id: 6,
        title: '审核不通过'
      },
      {
        id: 7,
        title: '审批不通过'
      },
      {
        id: 8,
        title: '全部状态'
      },
    ],
  },

  // 处理人筛选
  selectedName: function(e) {
    // 拿到筛选框的值selectedId selectedTitle
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
    let name = e.detail.selectedTitle;
    if (name == '全部处理人') {
      name = '';
    }
    this.setData({
      name: name,
      pageNum1: 1, //页码
      pageSize1: 10, //条数
      list: [],
      // todayflag:true
      loadflag: false
    })
    showLoading();
    this.serachReport();
  },
  // 状态筛选
  selectedStatus: function(e) {
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
    let status = e.detail.selectedTitle;
    let flag = 99;
    if (status == '待审核') {
      flag = 1;
    }
    if (status == '待审批') {
      flag = 3;
    }
    if (status == '审核通过') {
      flag = 2;
    }
    if (status == '审批通过') {
      flag = 4;
    }
    if (status == '审核不通过') {
      flag = 12;
    }
    if (status == '审批不通过') {
      flag = 14;
    }
    if (status == '报告归档') {
      flag = 5;
    }
    if (status == '全部状态') {
      flag = '';
    }
    // 先清空数据,初始化页码,再请求
    this.setData({
      status: e.detail.selectedTitle,
      flag: flag,
      pageNum1: 1, //页码
      pageSize1: 10, //条数
      list: [],
      // todayflag: true
      loadflag: false
    })
    showLoading();
    this.serachReport();
  },

  setopenflag(e) {
    console.log('123')
    console.log('sourceopen' + e.detail.sourceopen);
    let sourceopen = e.detail.sourceopen;
    this.setData({
      sourceopen: sourceopen //根据sourceopen 设置下拉菜单高度
    })
  },


  showDialog: function(e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getList();
    this.getPreUser();
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
    wx.stopPullDownRefresh();
    // 初始化数据

    this.setData({
      todayflag: true,
      pageNum: 1,
      pageSize: 10,
      list: [],
      name: '', //筛选名称 
      status: '', //状态筛选
      loadflag: false,
      nodataFlag:false
    })
    this.getList();
    this.getPreUser();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.selectedflag == '0') {
      // 到底后
      if (!this.data.loadflag){
        let pageNum = this.data.pageNum + 1;
        this.setData({
          pageNum: pageNum
        })
        showLoading();
        this.getList();
      }
    }
    if (this.data.selectedflag == '1') {
      if (!this.data.loadflag) {
        let pageNum1 = this.data.pageNum1 + 1;
        this.setData({
          pageNum1: pageNum1,
        })
        showLoading();
        this.serachReport();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})