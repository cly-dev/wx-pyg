// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //购物车数据
    cart: [],
    //收货地址
    address: "",
    //全选
    isAll: false,
    //结算数据
    pay: [],
    //总数
    count: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cart = wx.getStorageSync("cart");
    const address = wx.getStorageSync("address");
    cart && this.setData({ cart });
    address && this.setData({ address });
  },
  //选择收货地址
  handleAddress() {
    //wx选择地址api
    wx.chooseAddress({
      success: (result) => {
        this.setData({
          address: result,
        });
        wx.setStorageSync("address", result);
      },
    });
  },
  //radio点击事件
  handleChange(e) {
    let { cart } = this.data;
    let pay = [];
    let count = 0;
    e.detail.value.forEach((value) => {
      pay.push(cart[value]);
    });
    pay.forEach((value) => {
      count += value.goods_num * value.goods_price;
    });
    this.setData({
      pay,
      count,
    });
  },
  //减少数量
  handleReduce(e) {
    let { cart, pay, count } = this.data;
    let index = e.target.dataset.index;
    if (cart[index].goods_num > 1) {
      cart[index].goods_num -= 1;
      if (pay.some((item) => item.goods_id === cart[index].goods_id)) {
        count -= cart[index].goods_price;
      }
    } else {
      wx.showModal({
        title: "提示",
        content: "是否删除",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: (result) => {
          if (result.confirm) {
            count -= cart[index].goods_price;
            cart.splice(index, 1);
            this.setData({
              cart,
              count,
            });
            wx.setStorageSync("cart", cart);
          }
        },
        fail: () => {},
        complete: () => {},
      });
    }
    this.setData({
      cart,
      count,
    });
    wx.setStorageSync("cart", cart);
  },
  //增加数量
  handleAdd(e) {
    let { cart, count, pay } = this.data;
    cart[e.target.dataset.index].goods_num += 1;
    if (
      pay.some(
        (item) => item.goods_id === cart[e.target.dataset.index].goods_id
      )
    ) {
      count += cart[e.target.dataset.index].goods_price;
    }
    this.setData({
      cart,
      count,
    });
    wx.setStorageSync("cart", cart);
  },
  //点击全选
  handleAllChecked(e) {
    let { cart } = this.data;
    let count = 0;
    if (e.detail.value.length) {
      cart.forEach((value) => {
        count += value.goods_num * value.goods_price;
      });
      this.setData({
        isAll: true,
        pay: cart,
        count,
      });
      return;
    }
    this.setData({
      isAll: false,
      pay: [],
      count: 0,
    });
  },
  //点击结算
  handlePay() {
    if (!this.data.address) {
      wx.showToast({
        title: "未选择收货地址",
        icon: "error",
        duration: 1500,
        mask: false,
      });
      return;
    }
    if (!this.data.pay.length) {
      wx.showToast({
        title: "未选择商品",
        icon: "error",
        duration: 1500,
        mask: false,
      });
      return;
    }
    wx.setStorageSync("pay", this.data.pay);
    wx.setStorageSync("money", this.data.count);
    wx.navigateTo({
      url: "/pages/pay/pay",
    });
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
