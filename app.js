App({
  onLaunch(options) {
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync("code", res.code);
      },
    });
  },
  onShow(options) {},
  onHide() {},
  onError(msg) {},
  onPageNotFound(options) {},
});
