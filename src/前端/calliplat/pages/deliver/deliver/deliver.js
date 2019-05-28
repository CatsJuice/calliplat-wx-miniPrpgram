// pages/deliver/deliver.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'addImg':'/imgs/icons/add.png',
    'choseImg':'before-chose',
    'uploadImgPath':null,
    'tempFilePaths':null,

    'title':null,
    'content':null,

    'titleValue': '',
    'contentValue':''
  },
  listenTitle:function(e){
    this.setData({'title':e.detail.value})
  },
  listenContent: function (e) {
    this.setData({ 'content': e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 
   * 掉启图片选择
   */
  choseImg:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths);
        console.log(res.tempFiles);
        console.log(res.tempFiles[0].path);
        that.setData({
          'choseImg':'after-chose',
          'addImg': res.tempFiles[0].path,
          'tempFilePaths': res.tempFilePaths
        })
        
      },
    })
  },

  doDeliver:function(){

    var that = this;
    var tempFilePaths = this.data.tempFilePaths;

    wx.getStorage({
      key: 'openid',
      success: function(result) {
        if (!that.data.title || !that.data.content) {
          wx.showToast({
            title: '请先完善表单',
            image: '/imgs/icons/error.png'
          })
        } else if (!that.data.tempFilePaths) {
          wx.showToast({
            title: '请选择图片',
            image: '/imgs/icons/error.png'
          })
        } else if (that.data.title.length > 16) {
          wx.showToast({
            title: '标题不能超过16字',
            image: '/imgs/icons/error.png'
          })
        } else if (that.data.content.length > 200) {
          wx.showToast({
            title: '详情不得超过200字',
            image: '/imgs/icons/error.png'
          })
        } else {
          wx.showLoading({
            title: '发布中...',
            mask: true
          })
          wx.uploadFile({
            url: 'https://catsjuice.com/calliplat/api/1.0/deliverCalligraphy.php',
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json'
            },
            formData: {
              'title': that.data.title,
              'content': that.data.content,
              'openid': result.data
            },
            success: function (res) {
              console.log(res.data);
              var r = JSON.parse(res.data);
              if(r.status == "501"){
                wx.showModal({
                  title: '(#ﾟДﾟ) 未绑定',
                  content: '该功能需绑定使用，是否现在前往绑定',
                  showCancel: true,
                  cancelText: "暂不绑定",
                  confirmText: "前往绑定",
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/user/user/user',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }

                })
              }else{
                that.setData({
                  'titleValue': '',
                  'contentValue': '',
                  'addImg': '/imgs/icons/add.png',
                  'choseImg': 'before-chose'
                })
                wx.showToast({
                  title: '发布成功'
                })
              }
              
            },
            fail: function (res) {
              console.log('fail');
              wx.showToast({
                title: '发布失败',
                image:'/imgs/icons/error.png'
              })
            },
            complete:function(){
              wx.hideLoading();
            }
          })
        }
      },
      fail:function(){
        wx.showModal({
          title: '(#ﾟДﾟ) 未登录',
          content: '需登录才能发布，是否现在前往登录',
          showCancel: true,
          cancelText: "暂不登录",
          confirmText: "前往登录",
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/user/user/user',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  
  }
})