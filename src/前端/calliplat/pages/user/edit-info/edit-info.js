// pages/user/edit-info/edit-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'userHead':'',      // 用户头像
    'username':'',      // 用户名
    'wxId':'',          // 微信账号
    'schoolNum':'',     // 学号
    'email': '',        // 邮箱
    'nickName':'',      // 昵称 

    'userId':'',
    'openid':''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
  },

  /**
   * 获取个人信息
   */
  getUserInfo:function(){
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        that.setData({'openid':openid})
        // 已登录，获取用户信息
        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/getUserInfo.php',
          data: {
            'openid': openid
          },
          success: function (result) {
            console.log(result.data)
            that.setData({
              'userHead': result.data.data.head_path + "?" + Math.random() / 9999,
              'username': result.data.data.user_name,
              'userId': result.data.data.user_id,
              'email': result.data.data.email
            })
          }
        })
      },
    })
  },

  /**
   * 解绑微信账号
   */
  unBindWx:function(){
    var openid = this.data.openid;
    var that = this;
    wx.showModal({
      title: '解绑微信',
      content: '是否要解除微信账号与平台的绑定，解除后，你需要重新绑定',
      showCancel: true,
      cancelText: "取消",
      confirmText: "解绑",
      success(res){
        if (res.confirm){
          // 解绑
          wx.request({
            url: 'https://catsjuice.com/calliplat/api/1.0/unBindWx.php',
            data:{
              openid: openid
            },
            success:function(result){
              wx.removeStorage({
                key: 'is_bind',
                success(res) {
                  console.log(res.data)
                }
              })
              wx.switchTab({
                url: '/pages/user/user/user',
              })
            }
          })
        } else if (res.cancel){
          // do nothing
        }
      }
    })
  },

  /**
   * 更换头像
   */
  changeHead:function(){
    var that = this;
    wx.showModal({
      title: '更换头像',
      content: '是否要更换头像（当前暂不支持头像手动裁剪，图像将会自动居中裁剪为方形）',
      showCancel: true,
      cancelText: "算了",
      confirmText: "更换",
      success(modal) {
        if (modal.confirm) {
          wx.getStorage({
            key: 'openid',
            success: function(storage) {
              // 调动微信图像选择
              wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: function (result) {
                  wx.showLoading({
                    title: '头像上传中',
                    mask: true
                  })
                  // console.log(res.tempFilePaths);
                  // console.log(res.tempFiles);
                  // console.log(res.tempFiles[0].path);
                  // 上传图片，并更新用户信息
                  wx.uploadFile({
                    url: 'https://catsjuice.com/calliplat/api/1.0/updateUserHead.php',
                    filePath: result.tempFilePaths[0],
                    name: 'file',
                    header: {
                      "Content-Type": "multipart/form-data",
                      'accept': 'application/json'
                    },
                    formData: {
                      'openid': storage.data
                    },
                    success: function (res) {
                      console.log(res.data);
                      var r = JSON.parse(res.data);
                      console.log(r);
                      wx.setStorage({
                        key: "headNeedRefresh",
                        data: true                          
                      })
                      that.setData({
                        'userHead': r.head_path + "?" + Math.random() / 9999
                      })
                      //console.log(res.data.head_path + "?" + Math.random() / 9999);
                    },
                    fail: function (res) {
                      console.log('fail');
                      wx.showToast({
                        title: '上传失败',
                        image: '/imgs/icons/error.png'
                      })
                    },
                    complete: function () {
                      wx.hideLoading();
                    }
                  })

                },
              })
            },
            fail:function(){
              wx.showToast({
                title: '微信暂未登录',
                image: '/imgs/icons/error.png'
              })
            }
          })
        } else if (modal.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  },


  /**
   * 更改邮箱
   */
  changeEmail:function(){
    wx.showToast({
      title: '此功能暂未开放',
      image: '/imgs/icons/error.png'
    })
  },

  /**
   * 绑定学号
   */
  bindSchoolNum:function(){
    wx.showToast({
      title: '此功能暂未开放',
      image:'/imgs/icons/error.png'
    })
  }
})