components.add({
  name: "bootstrap",
  public: {
    version: "5.3.2",
  },
  private: {
    init: function () {
      mainComponent.addStyle({
        href: this.getUrl("css", "bootstrap.min.css"),
      });
      mainComponent.addScript({
        src: this.getUrl("js", "bootstrap.bundle.min.js"),
      });
    },

    getUrl: function (type, filename) {
      return `${type}/lib/${filename}`;
    },
  },
});
