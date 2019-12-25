// my-component/search-nav/search-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    start: "起始地",
    slist: [{
        id: 1,
        name: "第一类"
      },
      {
        id: 1,
        name: "第二类"
      },
      {
        id: 1,
        name: "第三类"
      },
      {
        id: 1,
        name: "第四类"
      },
      {
        id: 1,
        name: "第五类"
      },
    ],
    isstart: false,
    openimg: "/images/list/list.png",
    offimg: "/images/list/list1.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    opens: function(e) {
      switch (e.currentTarget.dataset.item) {
        case "1":
          if (this.data.isstart) {
            this.setData({
              isstart: false,
            });
          } else {
            this.setData({
              isstart: true,
            });
          }
          break;
      }
    },
    onclicks1: function(e) {
      var index = e.currentTarget.dataset.index;
      let name = this.data.slist[index].name;
      this.setData({
        isstart: false,
        isfinish: false,
        isdates: false,
        start: this.data.slist[index].name,
        finish: "目的地"
      })
    }
  }
})