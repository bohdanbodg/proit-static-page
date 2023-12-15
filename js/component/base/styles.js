components.add({
  name: "base/styles",
  public: {
    styles: [
      {
        name: "main",
      },
    ],

    /**
     * @param {string} name
     * @return {string}
     */
    getUrl: function (name) {
      return `css/${name}.css`;
    },

    /**
     * @param {string} name
     * @param {Object} data
     * @param {Object} attributes
     * @return {HTMLElement}
     */
    loadStyle: function (name, data = {}, attributes = {}) {
      const args = {
        component: this.public,
        name: name,
        data: data,
        attributes: attributes,
      };

      components.invokeCallbacks("style.load", "before", args);
      const styleElement = this.base.addStyle(
        this.getUrl(args.name),
        args.data,
        args.attributes
      );
      args.element = styleElement;
      components.invokeCallbacks("style.load", "after", args);

      return styleElement;
    },
  },
  private: {
    init: function () {
      const public = this.public;
      public.styles.forEach((style) => public.loadStyle(style.name));
    },
  },
});
