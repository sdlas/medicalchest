// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plantitle:'设定服药计划',//弹窗标题
    takemethodarr:['口服','外敷'],//服药方式
    editplan:false,//是否在修改服药列表
    showform: false,//显示设定服药计划界面
    pilltime:'2020balabala',//服药时间
    pillmethod:'',//服药方式
    noticemethod:'短信提醒',//提醒方式
    pilltimearr:[],//可选择的服药时间
    noticemethodarr:['短信提醒','药箱闹钟','短信提醒加药箱闹钟'],//可选择的提醒方式
    planlistarr: [
      { time: '2020年13月32日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }],method:'手机短信提醒'},
      { time: '2020年13月35日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }], method: '手机短信提醒' }, 
      { time: '2020年13月32日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }], method: '手机短信提醒' }
    ],
  },
  //增加服药计划
  addplan:function(){
    var that = this
    that.setData({
      showform:true
    })
  },
  //修改服药列表
  editplan:function(){
    var that = this
    that.setData({
      editplan:true,
      plantitle:'编辑药品列表'
    })
  },
  //确认服药列表
  confirm:function(){
    var that =this
    that.setData({
      editplan:false,
      plantitle:'设定服药计划'
    })
  },
  //确认服药
  confirmplan:function(){
    var that =this
    that.setData({
      showform:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://49.234.220.199/getplan.php',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        // if (res.data == null) {
        // } else {
        //   that.setData({
        //     medicinelist: res.data
        //   })
        // }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
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