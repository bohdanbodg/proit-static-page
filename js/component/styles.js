components.add({
  name: "styles",
  deps: ["bootstrap"],
  private: {
    init: function () {
      this.base.addStyle({ href: "css/main.css" });
    },
  },
});
