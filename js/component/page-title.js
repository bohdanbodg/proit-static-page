components.add({
  name: "page-title",
  public: {
    title: "ProIT Static Page",
    shortTitle: "ProIT SP",
    originalTitle: document.title,
  },
  private: {
    init: function () {
      const public = this.public;
      if (public.originalTitle.includes(public.title)) {
        return;
      }

      document.title = `${public.originalTitle} - ${public.title}`;
      document.title += " (DEV)"; // TODO: Remove dev indicator before release deploy
    },
  },
});
