// my-component/list-card/list-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nowName: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    reportNo: {
      type: String,
      default: ''
    },
    preUser: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: ''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    nowName1: '',
    borderColor: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapNow() {
      console.log('123')
    },
    tap: function() {
      console.log('123');
    },
    // 跳转到任务详情页
    toReportInfo(e) {
      console.log('123')
      console.log(e);
      let reportNo = e.currentTarget.dataset.reportno;
      let flag = e.currentTarget.dataset.flag;
      console.log(reportNo);
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/reportDetail/reportDetail?reportNo=' + reportNo + '&flag=' + flag,
        })
      }, 1000)
    },
  },
  attached() {
    // console.log(this.properties.nowName)

  },
  observers: {
    'nowName': function(nowName) {
      console.log(nowName);
      let flag = this.properties.nowName;
      let nowName1 = '';
      let borderColor = '';
      if (flag == '1') {
        nowName1 = '待审核';
        borderColor = 'border-left-blue';
      }
      if (flag == '3') {
        nowName1 = '待审批';
        borderColor = 'border-left-blue';
      }
      if (flag == '2') {
        nowName1 = '审核通过';
        borderColor = 'border-left-green';
      }
      if (flag == '4') {
        nowName1 = '审批通过';
        borderColor = 'border-left-green';
      }
      if (flag == '12') {
        nowName1 = '审核不通过';
        borderColor = 'border-left-red';
      }
      if (flag == '14') {
        nowName1 = '审批不通过';
        borderColor = 'border-left-red';
      }
      if (flag == '5') {
        nowName1 = '报告归档';
        borderColor = 'border-left-purple';
      }
      this.setData({
        nowName1: nowName1,
        borderColor: borderColor
      })
    }
  }

})