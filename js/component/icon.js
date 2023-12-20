components.add({
  name: "icon",
  private: {
    init: function () {
      this.base.appendTagToHead("link", {
        rel: "icon",
        href: "img/icon.ico",
      });
    },
  },
});
