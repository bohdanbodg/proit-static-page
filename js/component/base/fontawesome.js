components.add({
  name: "base/fontawesome",
  public: {
    version: "6.5.1",
  },
  private: {
    init: function () {
      this.base.addStyle(this.getUrl());
    },

    getUrl: function () {
      return `/fontawesome/css/solid.min.css`;
    },
  },
});
