// pages/cart/cart.js
const Data = require("../../data/index");
const { create } = Data;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //购物车数据
    cart: [],
    //收货地址
    address: "",
    //结算数据
    pay: [],
    //总数
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cart = wx.getStorageSync("pay");
    const address = wx.getStorageSync("address");
    const count = wx.getStorageSync("money");
    cart && this.setData({ cart, count });
    address && this.setData({ address });
  },
  //点击支付
  async handlePay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.showToast({
        title: "还未登录",
        icon: "none",
      });
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/user/user",
        });
      }, 2000);
      return;
    }
    const { cart } = this.data;
    cart.forEach((value) => {
      value.goods_number = value.goods_num;
    });
    const data = await create({
      order_price: this.data.count,
      consignee_addr: this.data.address,
      goods: cart,
    });
    console.log(data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
