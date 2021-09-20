const Data = require("../../data/index");
const { detail } = Data;
Page({
  data: {
    //商品Id
    goods_id: "",
    //数据详情
    DetailData: "",
    //是否收藏
    isCol: false,
  },
  onLoad(options) {
    const { goods_id } = options;
    this.setData({
      goods_id,
    });
    this.getGoodsDetail(goods_id);
    const col = wx.getStorageSync("col");
    if (col && col.some((value) => value.goods_id == goods_id)) {
      this.setData({
        isCol: true,
      });
    }
  },
  //获取商品详情
  async getGoodsDetail(id) {
    const {
      data: { message },
    } = await detail(id);
    this.setData({
      DetailData: message,
    });
  },
  //全屏查看图片
  handleWatch(e) {
    let imgList = [];
    this.data.DetailData.pics.forEach((value) => {
      imgList.push(value.pics_mid);
    });
    //预览图片
    wx.previewImage({
      current: e.target.dataset.url,
      urls: imgList,
    });
  },
  //点击加入购物车
  handleAddCart() {
    let cart = wx.getStorageSync("cart");
    if (!cart) {
      wx.setStorageSync("cart", []);
      cart = [];
    }
    if (
      !cart.some((value) => value.goods_id === this.data.DetailData.goods_id)
    ) {
      const { DetailData } = this.data;
      DetailData.goods_num = 1;
      cart.push(DetailData);
      wx.setStorageSync("cart", cart);
      wx.showToast({
        title: "添加成功",
      });
    } else {
      wx.showToast({
        title: "重复添加",
        icon: "error",
      });
    }
  },
  //点击收藏
  handleCol() {
    let col = wx.getStorageSync("col");
    if (!col) {
      wx.setStorageSync("col", []);
      col = [];
    }
    if (
      !col.some((value) => value.goods_id === this.data.DetailData.goods_id)
    ) {
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        duration: 1500,
        mask: true,
      });
      col.push(this.data.DetailData);
      wx.setStorageSync("col", col);
      this.setData({
        isCol: true,
      });
    }
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {},
  onPageScroll() {},
  onTabItemTap(item) {},
});
