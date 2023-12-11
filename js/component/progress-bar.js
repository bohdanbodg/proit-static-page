components.add({
  name: "progress-bar",
  private: {
    init: function () {
      let progressContainers = document.querySelectorAll("div.progress");
      if (progressContainers.length === 0) {
        return;
      }

      const self = this;
      progressContainers.forEach(function (container) {
        let value = container.getAttribute("value"),
          max = container.getAttribute("max");
        if (value === null || max === null) {
          return;
        }

        container.classList.add("h-auto", "w-auto", "mb-2");

        container.appendChild(self.createProgressBarElement(value, max));
      });
    },

    createProgressBarElement: function (value, max) {
      // Calculate percentage of the current progress value
      const donePercent = Math.round((value / max) * 100);

      let progressElement = mainComponent.createTag(
        "div",
        {},
        {
          "aria-valuemin": "0",
          "aria-valuenow": value,
          "aria-valuemax": max,
          role: "progressbar",
          style: `width: ${donePercent}%`,
        },
        ["progress-bar", "bg-warning", "text-dark"]
      );

      progressElement.appendChild(
        mainComponent.createTag(
          "span",
          {
            innerHTML: `${donePercent}% (${value}/${max})`,
          },
          {},
          ["mx-2", "my-1"]
        )
      );

      return progressElement;
    },
  },
});
