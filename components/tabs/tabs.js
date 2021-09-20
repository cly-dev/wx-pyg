Component({
  data: {
    tabs: [
      { name: "综合", isActive: true },
      { name: "销量", isActive: false },
      { name: "价格", isActive: false },
    ],
  },
  properties: {},
  methods: {
    handClickTabs(e) {
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
