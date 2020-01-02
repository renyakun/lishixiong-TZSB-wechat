// pages/setting/setting.js

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
const utilMd5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSee: false,
    isSee1: false,
    password: '', //密码值
    comfirmPassword: '', //确认密码值
    phoneVal: '', //电话值
    emailVal: '', //邮箱

    pwdCheckFlag: true, //校验通过
    pwdCheckFlag1: false,
    pwdComfirmFlag: true,
    pwdComfirmFlag1: false,

    comfirmphotoFlag: false, //电话号码校验
    comfirmphotoFlag1: true, //电话号码校验

    comfirmemailFlag: false,
    comfirmemailFlag1: true,
  },
  // 密码可见|不可见
  changeIsSee() {
    this.setData({
      isSee: !this.data.isSee
    })
  },
  changeIsSee1() {
    this.setData({
      isSee1: !this.data.isSee1
    })
  },

  getPassword(e) {
    console.log(e.detail);
    let val = e.detail.value;
    this.setData({
      password: val
    })
    if (this.data.comfirmPassword == this.data.password) {
      this.setData({
        pwdCheckFlag: true,
        pwdCheckFlag1: true,
        pwdComfirmFlag: true,
        pwdComfirmFlag1: true
      })
    }
  },
  //密码校验 
  checkPassword() {
    if (this.data.password.length < 1) {
      showToast('密码不能为空', 'none', 1000);
      this.setData({
        pwdCheckFlag: false,
        pwdCheckFlag1: false
      })
    } else {
      if (this.data.comfirmPassword != this.data.password) {
        showToast('密码不一致', 'none', 1000);
        this.setData({
          pwdComfirmFlag: false,
          pwdComfirmFlag1: false
        })
      } else {
        this.setData({
          pwdCheckFlag: true,
          pwdCheckFlag1: true,
          pwdComfirmFlag: true,
          pwdComfirmFlag1: true
        })
      }
    }
  },

  // 确认密码值
  getComfirmPassword(e) {
    console.log(e.detail);
    let val = e.detail.value;
    this.setData({
      comfirmPassword: val
    })
    if (this.data.comfirmPassword != this.data.password) {
      showToast('密码不一致', 'none', 1000);
      this.setData({
        pwdComfirmFlag: false,
        pwdComfirmFlag1: false
      })
    } else {
      this.setData({
        pwdCheckFlag: true,
        pwdCheckFlag1: true,
        pwdComfirmFlag: true,
        pwdComfirmFlag1: true
      })
    }
  },
  // 确认密码校验
  comfirmPassword() {
    if (this.data.comfirmPassword.length < 1) {
      showToast('密码不能为空', 'none', 1000);
      this.setData({
        pwdComfirmFlag: false
      })
    } else {

    }
  },

  // 电话校验
  checkPhoto(e) {
    this.setData({
      phoneVal: e.detail.value
    })
  },
  comfirmphoto() {
    if (this.data.phoneVal.length < 1) {
      showToast('电话不能为空', 'none', 1000);
      this.setData({
        comfirmphotoFlag1: false
      })
    } else {
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      if (!phoneReg.test(this.data.phoneVal)) {
        showToast('电话格式错误', 'none', 1000);
        this.setData({
          comfirmphotoFlag1: false
        })
        console.log("手机号码格式错误!");
      } else {
        this.setData({
          comfirmphotoFlag: true,
          comfirmphotoFlag1: true
        })
      }
    }
  },

  // 邮箱校验
  checkEmail(e) {
    this.setData({
      emailVal: e.detail.value
    })
  },
  comfirmemail() {
    if (this.data.phoneVal.length < 1) {
      showToast('邮箱不能为空', 'none', 1000);
      this.setData({
        comfirmemailFlag1: false
      })
    } else {
      let emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (!emailReg.test(this.data.emailVal)) {
        showToast('邮箱格式错误', 'none', 1000);
        this.setData({
          comfirmemailFlag1: false
        })
        console.log("邮箱格式错误!");
      } else {
        this.setData({
          comfirmemailFlag: true,
          comfirmemailFlag1: true
        })
      }
    }
  },

  resetVal() {
    this.setData({
      isSee: false,
      isSee1: false,
      password: '', //密码值
      comfirmPassword: '', //确认密码值
      phoneVal: '', //电话值
      emailVal: '', //邮箱
      pwdCheckFlag: true, //校验通过
      pwdCheckFlag1: false,
      pwdComfirmFlag: true,
      pwdComfirmFlag1: false,

      comfirmphotoFlag: false, //电话号码校验
      comfirmphotoFlag1: true, //电话号码校验
      comfirmemailFlag: false, //邮箱
      comfirmemailFlag1: true, //邮箱
    })
  },

  // 提交
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let valObj = e.detail.value;
    this.setData({
      valObj: valObj
    })
    if (this.data.pwdCheckFlag && this.data.pwdCheckFlag1 && this.data.pwdComfirmFlag && this.data.pwdComfirmFlag1 && this.data.comfirmphotoFlag && this.data.comfirmphotoFlag1 && this.data.comfirmemailFlag && this.data.comfirmemailFlag1) {
      this.commitChange();
    } else {
      showToast('信息不完整或格式不正确', 'none', 1000)
    }
  },
  // 提交修改
  commitChange() {
    let cookie = getApp().globalData.cookie;
    let pwd = utilMd5.hexMD5(this.data.comfirmPassword);
    checkModel('提示', '确认提交修改吗', () => {
      wxRequest('POST', url + '/report/user/updateUser', {
        confirmPwd: pwd,
        email: this.data.email,
        phone: this.data.comfirmPwd,
        signature: "",
      }, cookie, (res) => {
        console.log(res.data.data)
        if (res.data.ok) {
          console.log("修改成功")
          setTimeout(() => {
            showToast('修改成功', 'none', 1000)
          }, 1000)
          // 清楚cookie?,直接跳转登录页
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }, (err) => {
        console.log(err)
      })
    }, () => {
      // 取消
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let imgUrl = options
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