const Data = require("../../data/index");
const { swiperdata, catitems, floordata } = Data;
Page({
  data: {
    //轮播图
    swiperList: [],
    //导航菜单
    navList: [],
    //楼层数据
    floorData: [],
  },
  // 获取首页数据
  async getIndexData() {
    let [
      {
        data: { message: swiperList },
      },
      {
        data: { message: navList },
      },
      {
        data: { message: floorData },
      },
    ] = await Promise.all([swiperdata(), catitems(), floordata()]);
    this.setData({
      swiperList,
      navList,
      floorData,
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },

  onLoad(options) {
    this.getIndexData();
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
