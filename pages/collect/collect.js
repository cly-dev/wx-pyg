// pages/collect/collect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //分类
    category: [
      { name: "全部", isActive: true },
      { name: "正在热卖", isActive: false },
      { name: "即将上线", isActive: false },
    ],
    //收藏夹数据
    colData: [],
  },
  handleClickCate(e) {
    const { category } = this.data;
    category.forEach((value) => {
      value.isActive = false;
    });
    category[e.target.dataset.index].isActive = true;
    this.setData({
      category,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const col = wx.getStorageSync("col");
    col && this.setData({ colData: col });
    console.log(col);
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
