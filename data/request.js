const BaseUrl = "https://api-hmugo-web.itheima.net/api/public/v1/";
module.exports = (url, data = "", method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.showLoading({ mask: true });
    wx.request({
      url: `${BaseUrl + url}`,
      data,
      method,
      header: {
        "content-type": "application/json",
        Authorization: wx.getStorageSync("token")
          ? wx.getStorageInfoSync("token")
          : "",
      },
      dataType: "json",
      responseType: "text",
      success: (result) => {
        resolve(result);
      },
      fail: () => {
        resolve({
          message: "网络错误",
          status: 500,
        });
      },
      complete: () => {
        wx.hideLoading();
      },
    });
  });
};
