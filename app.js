//app.js


App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          console.log(capsule)
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
          console.log(this.globalData.CustomBar)
          console.log(e)

        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
   
  },
  onShow(options) {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError(msg) {
    console.log(msg)
  },

  globalData: {
    userInfo: null,
    cookie:''
  }
})