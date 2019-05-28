// pages/user/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  callback:function(){
    wx.navigateTo({
      url: '/pages/other/callback/callback',
    })
  },
  settingTheme:function(){
    wx.showToast({
      title: '(°Д°)还没做！',
      image:"/imgs/icons/error.png"
    })
  },

  clearStorage:function(){
    wx.showModal({
      title: '清除缓存',
      content: '清除缓存后，你需要重新登录，继续吗？',
      showCancel: true,
      cancelText: "取消",
      confirmText: "清除",
      success(res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
          } catch (e) {
            // Do something when catch error
            console.log(e);
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  },

  about:function(){
    wx.navigateTo({
      url: '/pages/other/about/about',
    })
  },

  loginOut:function(){
    
    wx.showModal({
      title: '退出登录',
      content: '确定登出吗',
      showCancel: true,
      cancelText: "再等等",
      confirmText: "登出",
      success(res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'openid',
            success(res) {
              console.log(res.data);
              wx.navigateBack({
                delta:1
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
  }

  
})