// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
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
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8888/bootmybatis/superadmin/listarea",
      method: 'GET',
      data: {},
      success: function(res) {
        var arealist = res.data.areaList;
        if (arealist == null) {
          var toastText = '获取失败:' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        }else {
          that.setData({
            list: arealist
          })
        }
      }
    })
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

  },

  /**
   * 添加事业部
   */
  addArea: function () {
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  /**
   * 删除事业部
   */
  deleteArea: function (e) {
    //e表示当前控件，即 list.wxml --> 删除那行的text控件
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除[' + e.target.dataset.areaname + ']吗？',
      success: function (sm) {  //弹出窗口的确认按钮
        if (sm.confirm) {
          wx.request({
            url: "http://127.0.0.1:8888/bootmybatis/superadmin/removearea",
            data: { "areaId": e.target.dataset.areaid }, //"areaId"为idea那边接收的参数名称(AreaController.java --> removeArea(Integer areaId))
            method: 'GET',
            success: function (res) {
              var result = res.data.success;
              var toastText = "删除成功！";
              if (result != true) {
                toastText = "删除失败";
              }else {
                that.data.list.splice(e.target.dataset.index, 1); //1表示删除1行
                that.setData({
                  list: that.data.list
                });
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            }
          })
        }
      }
    })
  }
})