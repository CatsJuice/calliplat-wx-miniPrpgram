// pages/other/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'password1Style': 'input-normal',
    'password2Style': 'input-normal',
    'usernameStyle': 'input-normal',
    'emailStyle': 'input-normal',
    'ckCodeStyle': 'input-normal',

    'username': null,
    'password1': null,
    'password2': "",
    'email': null,
    'ckCode': null,

    'isUsername': false,
    'ispassword': false,
    'isEmail': false,
    'isCkcode': false,

    'getCkcodeButton':"获取验证码",
    'timer':60,
    'canClick':true
  },
  regist:function(){
    if(!this.data.isUsername){
      this.setData({'usernameStyle':"input-error"});
    }
    if (!this.data.ispassword) {
      this.setData({ 'password1Style': "input-error", 'password2Style': "input-error"});
    }
    if (!this.data.isEmail) {
      this.setData({ 'emailStyle': "input-error" });
    }
    if (!this.data.isCkcode) {
      this.setData({ 'ckCodeStyle': "input-error" });
    }
    var that = this;
    if (this.data.isUsername && this.data.ispassword && this.data.isEmail && this.data.isCkcode){
      // 全部表单已合法
      console.log("username:" + that.data.username);
      console.log("password1:" + that.data.password1);
      console.log("email:" + that.data.email);
      console.log("ckCode:" + that.data.ckCode);
      wx.request({
        url: 'https://catsjuice.com/calliplat/api/1.0/regist.php',
        data: {
          username: that.data.username,
          password:that.data.password1,
          email: that.data.email,
          ckcode: that.data.ckCode
        },
        success: function (result) {
          console.log(result.data);
          if (result.data.status == 0) {
            console.log("注册成功");
            wx.showToast({
              title: '注册成功,2s后返回',
              image: '/imgs/icons/yes.png',
              success:function(){
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                },2000)
              },
              mask:true
            })
          } else if (result.data.status == 1) {
            that.setData({
              'mailInstrucation': "验证码验证失败，未注册！"
            })           
          } else if (result.data.status == 2) {
            that.setData({
              'mailInstrucation': "注册失败：发送邮件后请勿更改用户名"
            }) 
          } else if (result.data.status == 4){
            console.log("该用户名已注册");
            that.setData({
              'mailInstrucation': "该用户名已注册"
            }) 
          } else {
            console.log("缺少参数");            
          }
        },
        fail: function (res) {
          console.log(res.data);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // focus
  usernameFocus: function (e) {
    this.setData({ 'usernameStyle': "input-focus" })

  },
  password1Focus: function (e) {
    this.setData({ 'password1Style': "input-focus" })
  },
  password2Focus: function (e) {
    this.setData({ 'password2Style': "input-focus" })

  },
  emailFocus: function (e) {
    this.setData({ 'emailStyle': "input-focus" })

  },
  ckCodeFocus: function (e) {
    this.setData({ 'ckCodeStyle': "input-focus" })

  },

  // blur
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
        if (result.data.status == 0 || e.detail.value == "") {
          // 已存在
          that.setData({
            'usernameStyle': "input-error",
            'isUsername': false
          })
        } else {
          // 不存在
          that.setData({
            'usernameStyle': "input-correct",
            'isUsername': true
          })
        }
      }
    })
    this.setData({
      usernameFocus: 'input-normal',
      username: e.detail.value
    })
  },
  password1Blur: function (e) {
    if (e.detail.value.length < 6 || e.detail.value.length > 16) {
      this.setData({
        'password1Style': "input-error",
        'ispassword':"error"
      })
    } else {
      if (this.data.password2 == e.detail.value) {
        this.setData({
          'password1Style': "input-correct",
          'password2Style': "input-correct",
          'password1': e.detail.value,
          'ispassword': true
        })
      } else if (this.data.password2 == "") {
        this.setData({
          'password1Style': "input-normal",
          'password1': e.detail.value,
          'ispassword': false
        })
      } else {
        this.setData({
          'password1Style': "input-error",
          'password2Style': "input-error",
          'password1': e.detail.value,
          'ispassword': false
        })
      }
    }




  },
  password2Blur: function (e) {
    if (e.detail.value.length < 6 || e.detail.value.length > 16) {
      this.setData({
        'password1Style': "input-error"
      })
    } else {
      if (this.data.password1 == e.detail.value) {
        this.setData({
          'password1Style': "input-correct",
          'password2Style': "input-correct",
          'password2': e.detail.value,
          'ispassword': true,
        })
      } else {
        this.setData({
          'password1Style': "input-error",
          'password2Style': "input-error",
          'password2': e.detail.value,
          'ispassword': false
        })
      }
    }



  },
  emailBlur: function (e) {
    this.setData({ 'emailStyle': "input-normal" })
    let email = e.detail.value;
    let checkedNum = this.checkEmail(email);
    if (checkedNum) {
      console.log("邮箱格式正确");
      this.setData({
        'emailStyle': "input-correct",
        'email': email,
        'isEmail': true
      })
    }
  },
  ckCodeBlur: function (e) {
    let ckCode = e.detail.value;
    if (ckCode.length == 6) {
      //长度正确
      this.setData({
        'ckCodeStyle': "input-correct",
        'ckCode': ckCode,
        'isCkcode': true
      })
    } else {
      this.setData({
        'ckCodeStyle': "input-error",
        'isCkcode': false
      })
    }


  },
  /**
   * 邮箱格式校验
   */
  checkEmail: function (email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {

      wx.showToast({
        title: '邮箱格式有误',
        image: '/imgs/icons/error.png'
      })
      return false
    }
  },

  /**
   * 获取验证码
   */
  getCkCode: function () {
    var that = this;
    if (this.data.isUsername && this.data.isEmail) {
      if (this.data.canClick) {
        // 点击有效，
        this.startSetInter();

        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/bindMail.php',
          data: {
            username: that.data.username,
            email:that.data.email
          },
          success: function (result) {
            console.log(result.data);
            if (result.data.status == 0 ) {
              that.setData({
                'mailInstrucation': "邮件已发送，请查收你的邮箱，如果找不到请留意垃圾邮件"
              })
            }else{
              that.setData({
                'mailInstrucation': "发送邮件遇到未知错误"
              })
            }
          },
          fail:function(res){
            console.log(res.data);
          }
        })
      } else {
        // do nothing
      }
    } else {
      wx.showToast({
        title: '请先完善用户名',
        image: '/imgs/icons/error.png'
      })
    }
    
  },

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
        var num = that.data.timer-1;
        if(num == 0){
          that.endSetInter();
          that.setData({
            'canClick':true,
            'getCkcodeButton':"获取验证码",
            "timer":60
          })
        }else{
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
  onHide: function () {

  }
})