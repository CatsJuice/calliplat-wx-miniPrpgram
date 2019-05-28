// pages/index/index.js
let col1H = 0;
let col2H = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    bottomWord:'',
    searchValue:'',
    isLoading:false
  },

  /** 
   * 根据位移值获取item全部信息
  */
  getCaligraphy: function (offset){
    var that = this;
    var keyword = this.data.searchValue;
    console.log('https://catsjuice.com/calliplat/api/1.0/calligraphyList.php?offset=' + offset + "&keyword=" + keyword);
    wx.request({
      url: 'https://catsjuice.com/calliplat/api/1.0/calligraphyList.php',
      data: {
        offset:offset,
        keyword:keyword
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          images: res.data
        });
        if (res.data.error_code == "002"){
          that.setData({
            bottomWord: "已加载全部"
          });
        }
      }
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(){
    this.setData({
      images:[],
      col1:[],
      col2:[]
    });
    this.loadImages();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //that.getCaligraphy(0);
    this.loadImages();
    
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        //this.loadImages();
      }
    });
    
  },

  /**
   * 图片加载完成
   */
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.calligraphy_id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      //data.images = [];
    }

    this.setData(data);
    wx.stopPullDownRefresh();
    this.setData({
      'bottomWord': "上拉以加载更多",
      'isLoading':false
    });
  },

  /**
   * 加载新的图片
   */
  loadImages: function () {
    let images = this.data.images;
    let offset = 1;
    if(images.length == 0)
      offset = 0;
    for (let i = 0; i < images.length; i++) {
      if (i == images.length-1){
        offset = images[i].calligraphy_id;
      }
    }
    if(offset == 1){
      this.setData({
        'bottomWord': "已加载全部"
      });
    }else{
      this.getCaligraphy(offset);
      this.setData({
        loadingCount: images.length,
        images: images
      });
      
    }
  },

  /**
   * 到达底部，加载更多
   */
  onReachBottom:function(){
    if(!this.data.isLoading){
      // 如果并未在加载，避免重复加载导致数据紊乱
      this.setData({
        'bottomWord': "加载中...",
        'isLoading': true
      });
      this.loadImages();
    }
  },

  /**
   * 图片点击，跳转到详情页面
   */
  jpToDetail:function(e){
    let calliId = e.currentTarget.id;
    wx.navigateTo({
      url: '../item-detail/item-detail?calliId='+calliId,
    })
  },
  
  listenSearch:function(e){
    this.setData({
      images: [],
      col1: [],
      col2: [],
      searchValue: e.detail.value
    });
    this.loadImages();
  }
})