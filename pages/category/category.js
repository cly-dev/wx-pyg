// pages/category/category.js
const Data = require("../../data/index");
const { categories } = Data;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //列表
    categoriesData: [],
    //下标
    indexs: 0,
    //类别列表
    list: [],
  },
  //点击菜单
  handleClikeMenu(e) {
    let indexs = e.target.dataset.index;
    this.setData({
      indexs,
      list: this.data.categoriesData[indexs].children,
    });
  },
  //获取类别数据
  async getCategories() {
    let list = wx.getStorageSync("categories");
    console.log(list);
    if (list) {
      this.setData({
        categoriesData: list,
        list: list[0].children,
      });
      return;
    }
    const {
      data: { message: categoriesData },
    } = await categories();
    wx.setStorageSync("categories", categoriesData);
    this.setData({
      categoriesData,
      list: categoriesData[0].children,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategories();
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
