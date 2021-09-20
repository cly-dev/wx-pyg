// pages/search/search.js
let timer = null;
const Data = require("../../data/index");
const { qsearch } = Data;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //输入框文本
    content: "",
    //数据列表
    list: [],
  },
  //输入事件
  handleSearch(e) {
    if (timer != null) {
      clearInterval(timer);
    }
    timer = setTimeout(async () => {
      const content = e.detail.value;
      this.setData({
        content,
      });
      const {
        data: {
          message: { goods: list },
        },
      } = await qsearch(e.detail.value);
      console.log(list);
      this.setData({
        list,
      });
    }, 1000);
  },
  //取消事件
  handleCancel() {
    //通过selectComonent可以实现组件通信
    const tabs = this.selectComponent(".tabs");
    console.log(tabs.data);
    tabs.setData({
      content: "112",
    });
    this.setData({
      content: "",
      list: [],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
