// pages/user/user.js

let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    'islogin':false,
    'is_bind':null,
    'wxlogin_button':"微信登录",
    'usernameFocus': 'input-normal',
    'passwordFocus':'input-normal',
    'username':null,
    'password':null,
    'openid':null,
    'isUsername':false,
    'isOpenid':false,


    'headUrl': null,
    'userName': null,
    'userId': null,
    'email': null,


    'currentTab':0,     // 当前tab页面 : 默认为0
    'myOffset':0,        // tab1 我的发布的offset，默认为0
    'myCalliList':[],   // 我的发布列表 
    'myBottomStatus':'加载中...',  //底部指示文字
    'myIsLoading':false,  //判断是否正在加载，默认否


    'likeOffset':0,     // tab2 我的点赞的offset，默认为0,
    'likeList':[],      // 已点赞列表，默认为空，
    'likeBottomStatus':'加载中...',   // 已赞tab 底部指示文字，
    'likeIsLoading':false,  // 判断是否正在加载
    'canCancelLikeClick': true,   // 取消点赞是否可用，默认可用

    'commentOffset': 0,     // tab3 我的评论的offset，默认为0,
    'commentList': [],      // 评论列表，默认为空，
    'commentBottomStatus': '加载中...',   // 评论tab 底部指示文字，
    'commentIsLoading': false,  // 判断是否正在加载
  },

  // 用户名获取焦点
  usernameFocus:function(){
    this.setData({
      usernameFocus:'input-focus'
    })
  },
  // 用户名失去焦点
  usernameBlur: function (e) {
    var that = this;
    // 判断用户名是否存在
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/checkUsername.php',
      data: {
        username: e.detail.value
      },
      success: function (result) {
        console.log(result.data);
        if (result.data.status == 0){
          // 已存在
          that.setData({
            'usernameFocus':"input-correct",
            'isUsername':true
          })
        }else{
          // 不存在
          that.setData({
            'usernameFocus': "input-error",
            'isUsername': false
          })
        }
      }
    })
    this.setData({
      usernameFocus: 'input-normal',
      username: e.detail.value
    })
  },
  // 密码获取焦点
  passwordFocus: function () {
    this.setData({
      passwordFocus: 'input-focus'
    })
  },
  // 密码失去焦点
  passwordBlur: function (e) {
    this.setData({
      passwordFocus: 'input-normal',
      password: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin();
  },
  onShow: function (options){
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        wx.getStorage({
          key: 'is_bind',
          success: function(res2) {
            wx.getStorage({
              key: 'headNeedRefresh',
              success: function(res) {
                // 更新头像
                that.checkLogin();
                wx.removeStorage({
                  key: 'headNeedRefresh'
                })
              },
              fail:function(){
                // do nothing
              }
            })
          },
          fail:function(){
            that.checkLogin();
          }
        })
      },
      fail:function(){
        that.setData({
          'islogin': false,
          'is_bind': null,
          'wxlogin_button': "微信登录"
        })
      }
    })
  },

  /**
   * 
   * 微信登录函数
   */
  wxLogin:function(e){
    this.setData({
      'wxlogin_button':"微信登录中..."
    })
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://catsjuice.com/calliplat/api/1.0/wxLogin.php',
            data: {
              code: res.code
            },
            success:function(result){
              console.log(result.data);
              wx.setStorage({
                key: 'openid',
                data: result.data.openid
              });
              wx.setStorage({
                key: 'is_bind',
                data: result.data.is_bind
              })
              that.checkLogin();
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  /**
   * 登录状态检查
   */
  checkLogin:function(){
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        //let openid = res.data;
        // console.log(res.data);
        that.setData({
          'islogin':true,
          'openid':res.data
        })
        // 已登录，获取用户信息
        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/getUserInfo.php',
          data:{
            'openid':res.data
          },
          success:function(result){
            console.log(result.data)
            if (result.data.status == "404"){
              // 未登录
              console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
              that.setData({
                'is_bind':false
              })
            }else{
              that.setData({
                'headUrl': result.data.data.head_path + "?" + Math.random() / 9999,
                'userName': result.data.data.user_name,
                'userId': result.data.data.user_id,
                'email': result.data.data.email
              })
              that.getMyCalligraphy();
              that.getMyLike();
              that.getMyComment();
            }
          }
        })
      },
    });
    wx.getStorage({
      key: 'is_bind',
      success: function(res) {
        that.setData({
          is_bind:res.data
        })
      },
    })
  },

  /**
   * 登录并且绑定
   */
  loginBind:function(){
    var that = this;
    var username = this.data.username;
    var password = this.data.password;

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data);
        that.setData({
          'isOpenid':true,
          'openid':res.data
        });

        // 有openid 向服务器发送请求
        if (that.data.isUsername) {
          // openid获取到，并且username合法
          wx.request({
            url: 'https://catsjuice.com/calliplat/api/1.0/loginAndBind.php',
            data: {
              username: username,
              password: password,
              openid: res.data
            },
            success: function (result) {
              console.log(result.data);
              if (result.data.status == 0) {
                // 成功
                that.setData({
                  'passwordFocus': "input-correct",
                  'is_bind':true
                })
                wx.setStorage({
                  key: 'is_bind',
                  data: true
                })
                that.checkLogin();
              } else if (result.data.status == 1) {
                // 密码错误
                that.setData({
                  'passwordFocus': "input-error"
                })
              } else {
                console.log("登陆并绑定失败，错误代码：" + result.data.status + "错误信息：" + result.data.message);
              }
            }
          })
        }
      },
    });
    console.log("username:" + username);
    console.log("password:" + password);
    console.log("openid:" + this.data.openid);
   
  },

  // 转到注册
  jpToRegist:function(){
    wx.navigateTo({
      url: '/pages/other/regist/regist',
    })
  },

  // 转到忘记密码
  forgetPassword:function(){
    wx.navigateTo({
      url: '/pages/other/forgetPwd/forgetPwd',
    })
  },


  /**
   * 更换头像
   */
  changeHead:function(){
    var that = this;
    wx.previewImage({
      urls: [
        that.data.headUrl
      ],
    })
    
  },

  /**
   * tab 切换时触发
   */
  tabSwitch:function(e){
    this.setData({
      currentTab: e.detail.current
    });
  },

  /**
   * 点击tab标签时触发
   */
  switchTab:function(e){
    var cur = e.currentTarget.dataset.current;
    var that = this;
    //console.log(that.data.currentTab);
    //console.log(cur);
    if (that.data.currentTab == cur) {  
       if(cur == 0){
         that.refreshMyCalli();
       } else if(cur == 1){
         that.refreshMyLike();
       } else if(cur == 2){
         that.refreshMyComment();
       }
      
    } else {
      
      that.setData({
        'currentTab': cur
      })
    }
  },


  /**
   * 获取我的发布列表
   * 
   */
  getMyCalligraphy:function(){
    var that = this;
    var offset = that.data.myOffset;
    var userid = that.data.userId;
    console.log(offset);
    console.log(userid);
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/calligraphyList.php',
      data:{
        offset:offset,
        userid: userid
      },
      success:function(res){
        console.log(res.data);
        var myCalliList = that.data.myCalliList;
        for (let i = 0; i < res.data.length; i++) {
          myCalliList.push(res.data[i]);
        }
        
        if(res.data.length == 0 || res.data.error_code=="002"){
          that.setData({
            'myBottomStatus': '已加载全部'
          })
        }else{
          that.setData({
            'myCalliList': myCalliList,
            'myIsLoading': false
          })
        }
      }
    })
  },
  /**
   * 
   * 加载更多我得发布
   */
  loadMoreMyCalli: function () {
    if (!this.data.myIsLoading){
      this.setData({
        'myBottomStatus':'加载中...',
        'myIsLoading':true
      })
      var myCalliList = this.data.myCalliList;
      var offset = 0;
      if (myCalliList.length == 0)
        offset = 0;
      for (let i = 0; i < myCalliList.length; i++) {
        offset = myCalliList[i].calligraphy_id;
      }
      console.log(offset);
      this.setData({
        'myOffset': offset
      })
      this.getMyCalligraphy();
    }else{
      return false;
    }
    
  },
  /**
   * 图片点击，跳转到详情页面
   */
  jpToDetail: function (e) {
    let calliId = e.currentTarget.id;
    wx.navigateTo({
      url: '../../index/item-detail/item-detail?calliId=' + calliId,
    })
  },

  /**
   * 
   * 根据id删除我的发布
   */
  deleteMyCalli:function(e){
    var id = e.currentTarget.dataset.calliid;
    var that = this;
    console.log("url:" +"https://catsjuice.com/calliplat/api/1.0/deleteCalligraphy.php?calliId="+id);
    wx.showModal({
      title: '删除动态',
      content: '是否确认删除？删除后将无法恢复',
      showCancel: true,
      cancelText: "算了",
      confirmText: "确认删除",
      confirmColor:'#ce4e5a',
      success(res) {
        if (res.confirm) {
          // 发起请求删除动态
          wx.request({
            url: 'https://catsjuice.com/calliplat/api/1.0/deleteCalligraphy.php',
            data:{
              calliId:id
            },
            success:function(result){
              console.log(result.data);
              wx.showToast({
                title: '删除成功',
              })
              that.refreshMyCalli();
        
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },
  /**
   * 更新我的发布
   */
  refreshMyCalli:function(){
    this.setData({
      'myOffset': 0,        // tab1 我的发布的offset，默认为0
      'myCalliList': [],   // 我的发布列表 
      'myBottomStatus': '加载中...',  //底部指示文字
    })
    this.getMyCalligraphy();
  },


  /**
   * 获取我的点赞
   */
  getMyLike:function(){
    var that = this;
    var offset = that.data.likeOffset;
    var userid = that.data.userId;
    //console.log(offset);
    //console.log("https://catsjuice.com/calliplat/api/1.0/calligraphyList.php?offset="+offset+"&userid="+userid+"&handleLike=yes");
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/calligraphyList.php',
      data: {
        offset: offset,
        userid: userid,
        handleLike:"yes"
      },
      success: function (res) {
        console.log(res.data);
        var likeList = that.data.likeList;
        for (let i = 0; i < res.data.length; i++) {
          likeList.push(res.data[i]);
        }

        // console.log(res.data.error_code);
        if (res.data.length == 0 || res.data.error_code == "002") {
          that.setData({
            'likeBottomStatus': '已加载全部'
          })
        } else {
          that.setData({
            'likeList': likeList,
            'likeIsLoading': false
          })
        }
      }
    })
  },
  /**
   * 加载更多点赞
   */
  loadMoreLike:function(){
    if (!this.data.likeIsLoading) {
      this.setData({
        'likeBottomStatus': '加载中...',
        'likeIsLoading': true
      })
      var likeList = this.data.likeList;
      var offset = 0;
      if (likeList.length == 0)
        offset = 0;
      for (let i = 0; i < likeList.length; i++) {
        offset = likeList[i].calligraphy_id;
      }
      //console.log(offset);
      this.setData({
        'likeOffset': offset
      })
      this.getMyLike();
    } else {
      return false;
    }
  },
  /**
   * 刷新我的点赞
   */
  refreshMyLike:function(){
    this.setData({
      'likeOffset': 0,     
      'likeList': [],    
      'likeBottomStatus': '加载中...',   
      'likeIsLoading': false,  
    })
    this.getMyLike();
  },
  /**
   * 取消点赞
   */
  cancelLike:function(e){
    var calliId = e.currentTarget.dataset.calliid;
    var that = this;
    if (this.data.canCancelLikeClick){
      that.setData({'canCancelLikeClick':false});
      wx.getStorage({
        key: 'openid',
        success: function(res) {
          var openid = res.data;
          wx.showModal({
            title: '确认？',
            content: '确定取消点赞吗？确认后在你的点赞中将不可见',
            showCancel: true,
            cancelText: "算了",
            confirmText: "确定",
            confirmColor: '#ce4e5a',
            success(res) {
              if (res.confirm) {
                // 发起请求删除动态
                wx.request({
                  url: 'https://catsjuice.com/calliplat/api/1.0/likeClick.php',
                  data: {
                    openid: openid,
                    calliId: calliId
                  },
                  success: function (result) {
                    wx.showToast({
                      title: '取消点赞',
                    })
                    that.refreshMyLike();
                  },
                  complete: function () {
                    that.setData({ 'canCancelLikeClick': true });
                  }
                })
                
              } else if (res.cancel) {
                console.log('用户点击取消')
                that.setData({ 'canCancelLikeClick': true });
              }
            }
          });
        },
      })
    }
  },



  /**
   * 获取我的评论列表
   */
  getMyComment:function(){
    var that = this;
    var offset = that.data.commentOffset;
    var userid = that.data.userId;
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/myComment.php',
      data: {
        offset: offset,
        userid: userid
      },
      success: function (res) {
        console.log(res.data);
        var commentList = that.data.commentList;
        var append = res.data.comment_list;
        console.log(append);
        for (let i = 0; i < append.length; i++) {
          commentList.push(res.data.comment_list[i]);
        }

        // console.log(res.data.error_code);
        if (res.data.status == "000") {
          if (res.data.comment_list.length == 0){
            that.setData({
              'commentBottomStatus': '已加载全部'
            })
          }else{
            that.setData({
              'commentBottomStatus': '继续滑动加载更多',
              'commentList': commentList
            })
          } 
        }
      },
      complete:function(){
        that.setData({commentIsLoading:false})
      }
    })
  },
  /**
   * 加载更多评论
   */
  loadMoreComment:function(){
    if(!this.data.commentIsLoading){
      this.setData({
        'commentBottomStatus': '加载中...',
        'commentIsLoading': true
      })
      var commentList = this.data.commentList;
      var offset = 0;
      if (commentList.length == 0)
        offset = 0;
      for (let i = 0; i < commentList.length; i++) {
        offset = commentList[i].comment_id;
      }
      //console.log(offset);
      this.setData({
        'commentOffset': offset
      })
      this.getMyComment();
    }
  },
  /**
   * 刷新我的评论
   */
  refreshMyComment:function(){
    this.setData({
      'commentOffset': 0,
      'commentList': [],
      'commentBottomStatus': '加载中...',
      'commentIsLoading': false,
    })
    this.getMyComment();
  },
  /**
   * 删除我的评论
   */
  deleteMyComment(e){
    var comment_id = e.currentTarget.dataset.commentid;
    var that = this;
    wx.showModal({
      title: '确认删除？',
      content: '确定要删除这条评论吗？删除后将不可恢复',
      showCancel: true,
      cancelText: "取消",
      confirmText: "删除",
      confirmColor: '#ce4e5a',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://catsjuice.com/calliplat/api/1.0/deleteComment.php',
            data: {
              comment_id: comment_id
            },
            success: function (result) {
              wx.showToast({
                title: '删除成功',
              })
              that.refreshMyComment();
            },
            complete: function () {
              console.log(res.data);
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },



  /**
   * 跳转设置
   */
  jpToSetting:function(){
    wx.navigateTo({
      url: '/pages/user/setting/setting',
    })
  },
  /**
   * 跳转个人信息修改
   */
  jpToEditInfo:function(e){
    var userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/user/edit-info/edit-info?userid='+userid,
    })
  }

})