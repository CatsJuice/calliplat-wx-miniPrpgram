// pages/other/about/about.js
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


  lookBigImg: function () {
    wx.previewImage({
      urls: ['https://catsjuice.com/calliplat/img/mind.png'],
    })
  }
})