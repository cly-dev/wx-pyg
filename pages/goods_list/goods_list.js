// pages/goods_list/goods_list.js
const Data = require("../../data/index");
const { goodList } = Data;
let num = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //id
    cid: "",
    //详情列表
    list: [],
  },

  //获取数据
  async getDoodList(cid, pagenum = 1) {
    let { list } = this.data;
    let {
      data: {
        message: { goods: Datalist },
      },
    } = await goodList({ cid, pagenum, pagesize: 6 });
    if (Datalist.length <= 6 && Datalist.length != 0) {
      list = [...list, ...Datalist];
      this.setData({
        list,
      });
      return;
    }
    wx.showToast({
      title: "已经到底啦",
      icon: "error",
    });
  },
  //下滑到底部
  handleScrollLower() {
    num++;
    this.getDoodList(this.data.cid, num);
  },
  //开始滑动
  handleScrollStart() {
    //控制页面滑动
    wx.pageScrollTo({
      scrollTop: 100,
      duration: 300,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.cid,
    });
    this.getDoodList(options.cid);
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
  onPullDownRefresh: function () {
    let { list } = this.data;
    list.length = 0;
    this.setData({
      list,
    });
    this.getDoodList(this.data.cid);
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
