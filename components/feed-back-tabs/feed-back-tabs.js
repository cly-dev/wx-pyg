Component({
  data: {
    nav: [
      {
        name: "体验功能",
        isActiver: true,
      },
      {
        name: "商品、商家投诉",
        isActiver: false,
      },
    ],
  },
  properties: {},
  methods: {
    handleChange(e) {
      const { nav } = this.data;
      nav.forEach((value) => {
        value.isActiver = false;
      });
      nav[e.target.dataset.index].isActiver = true;
      this.setData({
        nav,
      });
    },
  },
});
