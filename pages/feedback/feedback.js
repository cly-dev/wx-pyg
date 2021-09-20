// pages/feedback/feedback.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose: [
      {
        name: "功能建议",
        isActiver: false,
      },
      {
        name: "购买遇到问题",
        isActiver: false,
      },
      {
        name: "性能问题",
        isActiver: false,
      },
      {
        name: "其他",
        isActiver: false,
      },
    ],
  },
  //选择原因
  handleChoose(e) {
    const { choose } = this.data;
    if (choose[e.target.dataset.index].isActiver) {
      choose[e.target.dataset.index].isActiver = false;
    } else {
      choose[e.target.dataset.index].isActiver = true;
    }
    this.setData({
      choose,
    });
  },
  //点击添加图片
  handleUpload() {
    //选取图片
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      // success: (result) => {
      //   var upTask = wx.uploadFile({
      //     url: '',
      //     filePath: ,
      //     name: ,
      //     formData: {},
      //     success: (result)=>{

      //     },
      //     fail: ()=>{},
      //     complete: ()=>{}
      //   });
      // },
      fail: () => {},
      complete: () => {},
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
