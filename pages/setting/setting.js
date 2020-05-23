// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:[],
    name:[],
    issign:false,
    id:[],//验证码的id
    showform:false,
    issend:false,
    rightphone:false,
    rightcode:false,
    timeout:false,//验证码是否过期
    phonenumber:[],//电话号码
    code:[],//用于置空验证码，
    codeplaceholder:"请输入四位验证码",//验证码填写提示
    resttime:60,//剩余有效时间
    openid:[],
  },
  //重新发送验证码
  resendcode:function(){
    var that = this
    that.setData({
      code:[],
      resttime:60,
      timeout:false,
      rightcode:false,
      codeplaceholder:"请输入四位验证码"
    })
    that.sendcode()
    //倒计时
    that.countTime()
  },
  //点击获取验证码
  getcode:function(e){
    var that = this
    if (!e.detail.value.code){//提交电话号码
      //验证码发送成功后
      console.log(that.data.phonenumber)
      that.sendcode()
      that.setData({
        issend: true
      })
      //倒计时
      that.countTime()
    }else{//提交验证码
      wx.request({
        url: 'https://www.laiad231.cn/medicalchestapp/send/simple/confirm.php',
        header: {
          'content-type': 'application/json' //默认值
        },
        data: {
          id: parseInt(that.data.id),
          value: that.data.code
        },
        success: function (res) {
          console.log(res.data)
          if (res.data === 1) {//验证码匹配
            that.setData({
              issign:true
            })
            //开始给用户匹配头像和昵称
            wx.request({
              url: 'https://www.laiad231.cn/medicalchestapp/send/simple/signin.php',
              header: {
                'content-type': 'application/json' //默认值
              },
              data: {
                phonenumber: that.data.phonenumber,
                openid:wx.getStorageSync('openid')
              },
              success: function (res) {
                console.log(res.data)
                that.getuserInfo()
              },
              fail: function (res) {
              },
              complete: function (res) {
              }
            })
            //调用关闭注册按钮
            that.cancelsignin()
          } else {//验证码不匹配
            that.setData({
              code: [],
              codeplaceholder: "验证码错误，请重新输入",
              rightcode: false
            })
          }
        },
        fail: function (res) {
        },
        complete: function (res) {
        }
      })
    }
  },
  //获取用户数据
  getuserInfo:function(e){
    var that = this
    wx.request({
      url: 'https://www.laiad231.cn/medicalchestapp/send/simple/getuserInfo.php',
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        openid: 'o7a1a5CBDcnA9ee4l7l_LM1KMjqQ'
      },
      success: function (res) {
        if(res.data==null){}else{
          that.setData({
            issign:true,
            avatar:res.data[0].avatar,
            name:res.data[0].name
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      openid:wx.getStorageSync("openid")
    })
    that.getuserInfo()
  },
  //使注册表单消失
  cancelsignin: function () {
    var that = this
    //并将所有数据初始化
    that.setData({
      showform: false,
      issend: false,
      rightphone: false,
      rightcode: false,
      timeout: false,//验证码是否过期
      phonenumber: [],//电话号码
      code: [],//用于置空验证码，
      codeplaceholder: "请输入四位验证码",//验证码填写提示
      resttime: 60,//剩余有效时间
    })
  },
  //点击显示注册表单
  signin: function () {
    var that = this;
    that.setData({
      showform: true
    })
  },
  //倒计时
  countTime: function () {
    var that = this
    const Interval = setInterval(function () {
      that.setData({
        resttime: that.data.resttime - 1
      })
      if (that.data.resttime === 0) {
        that.setData({
          timeout: true
        })
        clearInterval(Interval)
      }
      if (!that.data.showform) {
        clearInterval(Interval)
      }
    }
      , 1000)
  },
  //发送验证码请求
  sendcode: function () {
    var that = this
    wx.request({
      url: 'https://www.laiad231.cn/medicalchestapp/send/simple/sendcode.php',
      header: {
        'content-type': 'application/json' //默认值
      },
      data: {
        phonenumber: that.data.phonenumber
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          id: res.data
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  //每次输入时检测号码是否合理，合理时才可获取验证码
  checknumber: function (e) {
    var that = this
    if (/^1[3456789]\d{9}$/.test(e.detail.value)) {
      that.setData({
        rightphone: true
      })
    } else {
      that.setData({
        rightphone: false
      })
    }
    that.setData({
      phonenumber: e.detail.value
    })
  },
  //检验每次输入的验证码长度是否合理
  checkcode: function (e) {
    var that = this
    if (e.detail.value.length === 4) {
      that.setData({
        rightcode: true
      })
    } else {
      that.setData({
        rightcode: false
      })
    }
    that.setData({
      code: e.detail.value
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