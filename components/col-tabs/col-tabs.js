Component({
  data: {
    tabs: [
      { name: "商品收藏", isActive: true },
      { name: "品牌收藏", isActive: false },
      { name: "店铺收藏", isActive: false },
      { name: "浏览足迹", isActive: false },
    ],
    content: "",
  },
  properties: {},
  methods: {
    handleClickTabs(e) {
      const { tabs } = this.data;
      tabs.forEach((value) => {
        value.isActive = false;
      });
      tabs[e.target.dataset.index].isActive = true;
      this.setData({
        tabs,
      });
    },
  },
});
