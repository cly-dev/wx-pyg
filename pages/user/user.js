// pages/user/user.js
const Data = require("../../data/index");
const { token } = Data;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //导航
    nav: [
      { name: "收藏的店铺", num: 0 },
      { name: "收藏的商品", num: 0 },
      { name: "关注的商品", num: 0 },
      { name: "我的足迹", num: 0 },
    ],
    //用户信息
    userInfo: "",
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: "请求您的用户信息",
      success: (res) => {
        const { encryptedData, rawData, iv, signature } = res;
        //微信登陆
        wx.login({
          timeout: 10000,
          success: async (result) => {
            const { code } = result;
            const data = await token({
              encryptedData,
              rawData,
              iv,
              signature,
              code,
            });
            wx.setStorageSync(
              "token",
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
            );
            wx.showToast({
              title: "授权成功",
              icon: "success",
            });
          },
        });
        wx.setStorageSync("UserInfo", res);
        this.setData({
          userInfo: res.userInfo,
        });
      },
      fail: (res) => {
        wx.showToast({
          title: "取消授权",
          icon: "none",
        });
      },
    });
  },
  //退出登录
  handleLogout() {
    wx.clearStorageSync();
    this.setData({
      userInfo: "",
    });
  },
  //管理微信地址
  handleAdminAddress() {
    wx.chooseAddress({
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const UserInfo = wx.getStorageSync("UserInfo");
    if (UserInfo) {
      this.setData({
        userInfo: UserInfo.userInfo,
      });
    }
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
