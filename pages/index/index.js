//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    statusIcon : [
      "../../icon/car-normal.png",// 正常
      "../../icon/car-select.png",//已选择共享
      "../../icon/car.png", // 共享中
    ],
    ownCars : [
      {
        title: '车位1',
        desc : '自己的车位1',
        status : 0
      },
      {
        title: '车位2',
        desc: '自己的车位2',
        status: 1
      },
      {
        title: '车位3',
        desc: '自己的车位2',
        status: 2
      }
    ],
    theirCars : []

  },
  onLoad: function () {
    
  },
  onShareCar : function(e) {
    let that = this;
    let status = e.currentTarget.dataset.status
    let index = e.currentTarget.dataset.index
    
    switch(status) {
      case 0:
        wx.showModal({
          title: '确认共享？',
          content: '确认共享当前车位吗？',
          success:function(res) {
            if(res.confirm) {
              let data = that.data.ownCars;
              data[index].status = 1
              
              that.setData({
                ownCars : data
              })
            }
          }
        })
        break;
      case 1:
        wx.showModal({
          title: '确认取消共享？',
          content: '确认取消共享当前车位吗？',
          success: function (res) {
            if (res.confirm) {
              let data = that.data.ownCars;
              data[index].status = 0

              that.setData({
                ownCars: data
              })
            }
          }
        })
        break;
      case 2:
        wx.showToast({
          title: '当前车位共享中，不能操作',
          icon:'none'
        })
        break;
    }
  },
  onCatch : function(e) {
    let that = this;
    let status = e.currentTarget.dataset.status
    let index = e.currentTarget.dataset.index

    switch (status) {
      case 0:
        wx.showModal({
          title: '确认锁定？',
          content: '确认锁定当前车位吗？',
          success: function (res) {
            if (res.confirm) {
              let data = that.data.theirCars;
              data[index].status = 1

              that.setData({
                theirCars: data
              })
            }
          }
        })
        break;
      case 1:
        wx.showModal({
          title: '确认释放？',
          content: '确认释放当前车位吗？',
          success: function (res) {
            if (res.confirm) {
              let data = that.data.theirCars;
              data[index].status = 0

              that.setData({
                theirCars: data
              })
            }
          }
        })
        break;
      case 2:
        wx.showToast({
          title: '当前车位共享中，不能操作',
          icon: 'none'
        })
        break;
    }
  },
  onSearch : function(e) {
    let that = this
    wx.showLoading({
      title: '搜索中...',
    })
    // 模拟搜索
    setTimeout(function() {
      wx.hideLoading()
      that.search_request()
    },1500)
  },
  // 现在为模拟数据展示
  search_request : function() {
    let data = []
    let random = parseInt(Math.random() * 30);
    
    for(let i=0;i<random;i++) {
      let status = Math.random() < 0.9 ? 0 : 1
      data.push({
        title: '车位' + (i+1),
        desc: 'XX的车位' + (i+1),
        status: status
      })
    }
    this.setData({
      theirCars : data
    })
  }
})
