components.add({
  name: "bootstrap",
  public: {
    version: "5.3.2",
  },
  private: {
    init: function () {
      const args = { component: this.public };

      components.invokeCallbacks("bootstrap.style.add", "before", args);
      this.base.addStyle({
        href: this.getUrl("css", "bootstrap.min.css"),
      });
      components.invokeCallbacks("bootstrap.style.add", "after", args);

      components.invokeCallbacks("bootstrap.script.add", "before", args);
      this.base.addScript({
        src: this.getUrl("js", "bootstrap.bundle.min.js"),
      });
      components.invokeCallbacks("bootstrap.script.add", "after", args);
    },

    getUrl: function (type, filename) {
      return `${type}/lib/${filename}`;
    },
  },
});
