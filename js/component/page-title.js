components.add({
  name: "page-title",
  public: {
    title: "ProIT Static Page",
    originalTitle: document.title,
  },
  private: {
    init: function (data) {
      if (data.public.originalTitle.includes(data.public.title)) {
        return;
      }

      document.title = `${data.public.originalTitle} - ${data.public.title}`;
      document.title += " (DEV)"; // TODO: Remove dev indicator before release deploy
    },
  },
});
