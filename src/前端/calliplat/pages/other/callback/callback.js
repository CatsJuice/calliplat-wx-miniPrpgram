// pages/other/callback/callback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'title':'',
    'content':'',
    'count':0,
    'cansend':true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateCount();
  },

  /**
   * 标题输入
   */
  titleInput:function(e){
    this.setData({'title':e.detail.value})
  },

  /**
   * 内容输入
   */
  contentInput: function (e) {
    this.setData({ 'content': e.detail.value })
  },

  /**
   * 发送反馈
   */
  doCallBack:function(){
    var that = this;
    var title = this.data.title;
    var content = this.data.content;
    if(this.data.cansend){
      this.setData({ 'cansend': false });
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          var openid = res.data;
          console.log("openid in doCallBack:" + openid);
          if (title.length == 0 || content.length == 0) {
            wx.showToast({
              title: '请先完善表单',
              image: '/imgs/icons/error.png'
            })
            that.setData({ 'cansend': true });
          } else if (that.data.count == 0) {
            wx.showToast({
              title: '今日反馈达上限',
              image: '/imgs/icons/error.png'
            })
            that.setData({ 'cansend': true });
          } else {
            wx.showLoading({
              title: '发送中...',
            })
            wx.request({
              url: 'https://catsjuice.com/calliplat/api/1.0/callback.php',
              data: {
                openid: openid,
                title: title,
                content: content
              },
              success: function (result) {
                console.log(result.data);
                wx.showToast({
                  title: '反馈成功'
                })
                that.setData({
                  'title': '',
                  'content': ''
                })
                that.updateCount();
              },
              complete:function(){
                that.setData({ 'cansend': true });
                wx.hideLoading();
              }
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '请先前往登录',
            image: '/imgs/icons/error.png'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/user/user/user',
            })
          }, 2000)
        }
      })
    }else{
      // do nothing
    }
    
    
  },

  /**
   * 更新反馈数据
   */
  updateCount:function(){
    
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        console.log("openid in updateCount:" + openid);
        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/callback.php',
          data:{
            openid:openid
          },
          success:function(result){
            console.log(result.data);
            if(result.data.status == "000"){
              var count = result.data.count;
              that.setData({
                'count': count
              })
            }
          }
        })
      }
    })
  }
})