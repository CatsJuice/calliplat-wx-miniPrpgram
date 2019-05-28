// pages/index/item-detail/item-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'calliId':'0',
    'calliInfo': [],
    'commentInfo':[],
    'loadingImgClassName':'show',
    'noComment':'hide',
    'openid':null, 
    'islike':false,
    'commentContent':null,
    'commentValue':null,
    'commentCount':0,
    'view':0,
    'good':0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'calliId':options.calliId
    });
    this.getItemDetailById(options.calliId);
    this.getCommentListById(options.calliId);
    this.updateViewNum(options.calliId);
  },

  onImgLoad:function(e){
    this.setData({
      loadingImgClassName:'hide'
    });
  },

  /**
   * 根据id从服务器获取item详情
   */
  getItemDetailById:function(id){
    let that = this;

    // 从storage中获取openid判断是否已登录
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({'openid':res.data});
        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/calligraphyList.php',
          data: {
            'calliId': id,
            'openid': res.data
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.setData({
              'calliInfo': res.data,
              'islike': res.data[0].is_like,
              'good':res.data[0].good
            });
            console.log(res.data[0].good);
          }
        })
      },
      fail:function(res){
        wx.request({
          url: 'https://catsjuice.com/calliplat/api/1.0/calligraphyList.php',
          data: {
            'calliId': id,
            'openid': that.data.openid
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.setData({
              calliInfo: res.data,
              good:res.data[0].good
            });
          }
        })
      }
    })
    
    
  },

  /**
   * 根据id从服务器获取评论详情
   */
  getCommentListById:function(id){
    let that = this;
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/commentList.php?calliId=' + id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          commentInfo: res.data
        });
        if(res.data.length == 0){
          that.setData({
            noComment: 'show'
          });
        }else{
          that.setData({
            noComment: 'hide',
            commentCount: res.data.length
          });
        }
          
      }
    })
  },

  /**
   * 更新数据库浏览数
   */
  updateViewNum:function(id){
    let that = this;
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/updateViewNum.php',
      data: {
        calliId:id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          view:res.data.view
        })
      }
    })
  },


  /**
   * 点赞
   */
  likeClick:function(){
    var that = this;
    var openid = this.data.openid;
    var calliId = this.data.calliId;
    if (!openid) {
      wx.showModal({
        title: '(#ﾟДﾟ) 未登录',
        content: '该功能需登录使用，是否现在前往登录',
        showCancel:true,
        cancelText:"暂不登录",
        confirmText:"前往登录",
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
      wx.request({
        url: 'https://catsjuice.com/calliplat/api/1.0/likeClick.php',
        data:{
          openid: openid,
          calliId:calliId
        },
        success:function(res){
          console.log(res.data);
          if(res.data.status == 0){
            if(that.data.islike){
              that.setData({'islike':false})
              wx.showToast({
                title: '取消点赞',
                image: '/imgs/icons/favorite.png'
              })
            }else{
              wx.showToast({
                title: '点赞成功',
                image: '/imgs/icons/favorite2.png'
              })
              that.setData({'islike': true })
            }
            that.setData({'good':res.data.good})
          } else if (res.data.status == 1){
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
          }
        }
      })
    }
  },

  // 监听评论输入框的值
  listenCommentInput:function(e){
    this.setData({
      'commentContent':e.detail.value
    });
  },

  /**
   * 发送评论
   */
  sendComment:function(){
    var that = this;
    var openid = this.data.openid;
    var calliId = this.data.calliId;
    var commentContent = this.data.commentContent;
    if (!commentContent){
      wx.showToast({
        title: '请先输入评论',
        image: '/imgs/icons/error.png'
      })
      return false;
    }
    if(!openid){
      wx.showModal({
        title: '(#ﾟДﾟ) 未登录',
        content: '该功能需登录使用，是否现在前往登录',
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
    }else{
      wx.request({
        url: 'https://catsjuice.com/calliplat/api/1.0/deliverComment.php',
        data:{
          openid:openid,
          calliId:calliId,
          commentContent: commentContent
        },
        success:function(res){
          if(res.data.status == 0){
            wx.showToast({
              title: '评论成功',
              image: '/imgs/icons/yes.png'
            });
            that.setData({'commentValue':''})
            that.getCommentListById(calliId);
          }else if(res.data.status == "501"){
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
          }
        },
        complete:function(res){
          console.log(res.data);
        }
      })
    }
  },

  showPrev:function(){
    var that = this;
    wx.previewImage({
      urls: [
        that.data.calliInfo[0].img_path
      ],
    })
  }
})