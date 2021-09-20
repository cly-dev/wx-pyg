const request = require("./request");
const DataList = {
  // 轮播图
  swiperdata: () => request("home/swiperdata"),
  //首页导航
  catitems: () => request("home/catitems"),
  //楼层数据
  floordata: () => request("home/floordata"),
  //分类数据
  categories: () => request("categories"),
  //获取商品列表
  goodList: (data) => request("goods/search", data),
  //获取商品详情
  detail: (goods_id) => request("goods/detail", { goods_id }),
  //获取token
  token: (data) => request("users/wxlogin", data, "POST"),
  //创建订单
  create: (data) => request("my/orders/create", data, "POST"),
  //搜索商品事件
  qsearch: (data) => request("goods/search", data),
};
module.exports = DataList;
