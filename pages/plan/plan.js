// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdruglist:false,//是否显示药物列表
    editplan:false,//判断是否是修改计划
    plantitle:'设定服药计划',//弹窗标题
    takemethodarr:['口服','外敷'],//服药方式
    iseditplan:false,//是否在修改服药列表
    showform: false,//显示设定服药计划界面
    //表单当前数据
    pilltime:'2020balabala',//服药时间
    pillmethod:'',//服药方式
    noticemethod:'短信提醒',//提醒方式
    pilltimearr:["今天10:10","明天20：20","后天12：12"],//可选择的服药时间
    pillmedlist:'0',//药物列表
    curid:[],//当前修改计划的id
    noticemethodarr:['短信提醒','药箱闹钟','短信提醒加药箱闹钟'],//可选择的提醒方式
    planlistarr: [
      { id:1,time: '2020年13月32日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }],method:'手机短信提醒'},
      { id:2,time: '2020年13月35日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }], method: '手机短信提醒' }, 
      { id:3,time: '2020年13月32日', numlist: [{ id: "1", name: '敌敌畏', num: '10t', type: '口服' }, { id: '2', name: '老鼠药', num: '3t', type: '口服' }], method: '手机短信提醒' }
    ],
    druglist:[
      {id:1,name:'敌敌畏',num:'10t'},
      { id: 2, name: '秘制汉堡', num: '9t' },
      { id: 3, name: '老鼠药', num: '5t' },
    ],
  },
  //删除新的药品
  deletemed:function(e){
    var that = this
    var id= e.currentTarget.dataset.id
    that.data.pillmedlist.splice(id,1)
    that.setData({
      pillmedlist:that.data.pillmedlist
    })
  },
  //选择新的药物
  choosedrug:function(e){
    var that = this
    that.setData({
      showdruglist:false
    })
    var id = e.currentTarget.dataset.id
    var newdrug={
      id:that.data.druglist[id].id,
      name:that.data.druglist[id].name,
      num:10,
      type:'口服'
    }
    for( var p in that.data.planlistarr){
      if(that.data.planlistarr[p].id==that.data.druglist[id].id){
        wx.showToast({
          title: '错误',
        })
        return;
      }
    }
    that.data.pillmedlist.push(newdrug)
    that.setData({
      pillmedlist:that.data.pillmedlist
    })
  },
  //添加新的药物
  addnewdrug:function(){
    var that = this
    that.setData({
      showdruglist:true,
      plantitle:'添加药物',
    })
  },
  //服药剂量修改
  numchange:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    var planitemid = that.data.curid
    that.data.pillmedlist[id].num = e.detail.value
  },
  //服药方式修改
  typechange:function(e){
    var that = this
    var planitemid = that.data.curid
    var id = e.currentTarget.dataset.id
    var value = parseInt(e.detail.value)
    that.data.pillmedlist[id].type = that.data.takemethodarr[value]
    that.setData({
      pillmedlist:that.data.pillmedlist
    })
  },
  //服药时间和服药方式修改
  timechange:function(e){
    var that = this
    that.setData({
      pilltime:that.data.pilltimearr[parseInt(e.detail.value)]
    })
  },
  methodchange:function(e){
    var that = this
    that.setData({
      noticemethod:that.data.noticemethodarr[parseInt(e.detail.value)]
    })
  },
  //编辑服药计划
  edititem:function(e){
    var that =this
    var planlistarr = that.data.planlistarr
    var id = e.currentTarget.dataset.id
    that.setData({
      showform:true,
      iseditplan:true,
      plantitle:'修改服药计划',
      curid:id
    })
    for( var p in planlistarr){
      if(planlistarr[p].id==id){
        that.setData({
          pilltime:planlistarr[p].time,
          noticemethod:planlistarr[p].method,
          pillmedlist:planlistarr[p].numlist
        })
        break;
      }
    }
    console.log(that.data.pilltime)
  },
  //增加服药计划
  addplan:function(){
    var that = this
    that.setData({
      showform:true,
      iseditplan:false
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
    var id = that.data.curid
    var planlistarr = wx.getStorageSync("planlistarr")
    for(var p in planlistarr){
      if(planlistarr[p].id==id){
        planlistarr[p].numlist = that.data.pillmedlist
        break;
      }
    }
    wx.setStorageSync('planlistarr', planlistarr)
  },
  //确认服药计划
  confirmplan:function(){
    var that =this
    id = that.data.curid
    that.setData({
      showform:false
    })
    var planlistarr = wx.getStorageSync("planlistarr")
    if(!that.data.iseditplan){
      var newitem = {
        id:parseInt(planlistarr.length)+1,
        time:that.data.pilltime,
        numlist:that.data.pillmedlist,
        method:that.data.noticemethod,
      }
      planlistarr.push(newitem)
      wx.setStorageSync('planlistarr', planlistarr)
    }else{//修改服药计划
    console.log("??")
      var newitem = {
        id: id,
        time: that.data.pilltime,
        numlist: that.data.pillmedlist,
        method: that.data.noticemethod,
      }
      for(var p in planlistarr){
        console.log("ss")
        if(planlistarr[p].id==id){
          planlistarr[p] = newitem
          console.log(planlistarr[p])
          break;
        }
      }
      wx.setStorageSync('planlistarr',planlistarr)
    }
    that.fresh()
    that.returnform()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setStorageSync("planlistarr", that.data.planlistarr)
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
//刷新显示
  fresh: function () {
    var that = this
    that.setData({
      planlistarr:wx.getStorageSync('planlistarr')
    })
  },
//还原表单
returnform:function(){
  var that = this
  that.setData({
    pilltime:'请选择提醒时间',
    pillmethod:'请选择提醒方式',
    pillmedlist:'0'
  })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})