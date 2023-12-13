components.add({
  name: "page-title",
  public: {
    title: "ProIT Static Page",
    shortTitle: "ProIT SP",
    originalTitle: document.title,
  },
  private: {
    init: function () {
      if (this.public.originalTitle.includes(this.public.title)) {
        return;
      }

      const args = { component: this.public };

      components.invokeCallbacks("page-title.set", "before", args);
      document.title = `${this.public.originalTitle} - ${this.public.title}`;
      document.title += " (DEV)"; // TODO: Remove dev indicator before release deploy
      components.invokeCallbacks("page-title.set", "after", args);
    },
  },
});
