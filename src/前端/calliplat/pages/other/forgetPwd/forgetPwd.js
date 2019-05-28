// pages/other/forgetPwd/forgetPwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'usernameStyle':"input-normal",
    'ckCodeStyle':"input-normal",
    'passwordStyle':"input-normal",
    'getCkcodeButton':"获取验证码",

    'isUsername':false,
    'isCkcode':false,
    'isPassword':false,

    'username':null,
    'finalUsername':null,
    'ckCode':null,
    'password':null,

    'canClick':true,
    'mailInstrucation':'点击上方按钮以获取验证码',
    'timer':60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // onfocus
  usernameFocus:function(e){
    this.setData({ "usernameStyle": "input-focus"})
  },
  ckCodeFocus: function (e) {
    this.setData({ "ckCodeStyle": "input-focus" })
  },
  passwordFocus: function (e) {
    this.setData({ "passwordStyle": "input-focus" })
  },
  
  // onblur 
  usernameBlur: function (e) {
    this.setData({
      'username': e.detail.value
    })
    var that = this;
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/checkUsername.php',
      data: {
        username: e.detail.value
      },
      success: function (result) {
        console.log(result.data);
        if (result.data.status == 0) {
          // 已存在
          that.setData({
            'usernameStyle': "input-correct",
            'isUsername': true
          })
        } else {
          // 不存在
          that.setData({
            'usernameStyle': "input-error",
            'isUsername': false
          })
        }
      }
    })
  },
  ckCodeBlur: function (e) {
    if (e.detail.value.length == 6){
      this.setData({ 
        "ckCodeStyle": "input-normal" ,
        'isCkcode':true,
        'ckCode': e.detail.value
      })
    }else{
      this.setData({
        "ckCodeStyle": "input-normal",
        'isCkcode': false
      })
    }
  },
  passwordBlur: function (e) {
    if (e.detail.value.length > 5 && e.detail.value.length < 17) {
      this.setData({
        "passwordStyle": "input-normal",
        'isPassword': true,
        'password': e.detail.value
      })
    } else {
      this.setData({
        "passwordStyle": "input-error",
        'isPassword': false
      })
    }
  },



  /**
   * 获取验证码
   */
  getCkCode: function () {
    var that = this;
    if (this.data.isUsername) {
      if (this.data.canClick) {
        // 点击有效，
        this.setData({
          'finalUsername': this.data.username
        })
        this.startSetInter();

        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/checkMail.php',
          data: {
            username: that.data.username
          },
          success: function (result) {
            console.log(result.data);
            if (result.data.status == 0) {
              that.setData({
                'mailInstrucation': "邮件已发送，请查收你的邮箱，如果找不到请留意垃圾邮件"
              })
            } else {
              that.setData({
                'mailInstrucation': "发送邮件遇到未知错误"
              })
            }
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      } else {
        // do nothing
      }
    } else {
      wx.showToast({
        title: '请填写用户名',
        image: '/imgs/icons/error.png'
      })
    }

  },
  // 设置定时器
  startSetInter: function () {

    var that = this;
    var timer = this.data.timer;
    this.setData({
      'getCkcodeButton': "重新获取(" + timer + ")",
      'canClick': false
    })
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        // console.log("我来证明你运行了这个function");
        // var numVal = that.data.num + 1;
        // that.setData({ num: numVal });
        // console.log('setInterval==' + that.data.num);
        var num = that.data.timer - 1;
        if (num == 0) {
          that.endSetInter();
          that.setData({
            'canClick': true,
            'getCkcodeButton': "获取验证码",
            "timer": 60
          })
        } else {
          that.setData({
            'getCkcodeButton': "重新获取(" + num + ")",
            'timer': num
          })
        }
      }
      , 1000);

  },
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

  // 重置密码
  resetPassword:function(){
    if(!this.data.isUsername){
      this.setData({
        'usernameStyle':"input-error"
      })
    }
    if (!this.data.isPassword) {
      this.setData({
        'passwordStyle': "input-error"
      })
    }
    if (!this.data.isCkcode) {
      this.setData({
        'ckCodeStyle': "input-error"
      })
    }

    var that = this;
    if (this.data.isUsername && this.data.isPassword && this.data.isCkcode){
      var username = that.data.finalUsername;
      var ckCode = that.data.ckCode;
      var password = that.data.password;
      wx.request({
        url: 'https://catsjuice.com/calliplat/api/1.0/resetPassword.php',
        data: {
          username:username,
          ckcode: ckCode,
          password: password
        },
        success:function(res){
          //console.log(res.data);
          if(res.data.status == 0){
            wx.showToast({
              title: '密码重置成功',
              success:function(){
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }
            })
          }else{
            wx.showToast({
              title: res.data.message,
              image: '/imgs/icons/error.png'
            })
          }
        }
      })
    }
  }
})