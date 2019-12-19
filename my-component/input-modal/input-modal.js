// my-component/input-modal/input-modal.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: String,
      value: '',
    },

    // 模态框title标题
    title: {
      type: String,
      value: '',
    },
    // 模态框msg内容
    content: {
      type: String,
      value: ''
    },
    // 模态框状态 1.‘’；2.‘success’；3.‘error’
    cancelText: {
      type: String,
      value: ''
    },
    confirmText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    manager: {

    },
    isInput:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    makeCall() {
      var mobile = this.data.manager.mobileNo
      wx.makePhoneCall({
        phoneNumber: mobile,
      })
    },

    hide() {
      this.setData({
        showModal: false
      })
    },

    show() {
      this.setData({
        showModal: true
      })
    },

    _onCancel() {
      this.triggerEvent("cancelEvent")
    },

    _onConfirm() {
      this.triggerEvent("confirmEvent")
    },

    show() {
      this.setData({
        showModal: true
      })
    },
    hide() {
      this.setData({
        showModal: false
      })
    }

  }


})