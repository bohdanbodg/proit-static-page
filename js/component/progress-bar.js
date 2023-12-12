components.add({
  name: "progress-bar",
  dependencies: ["bootstrap"],
  private: {
    init: function () {
      let progressContainers = document.querySelectorAll("div.progress");
      if (progressContainers.length === 0) {
        return;
      }

      const self = this;
      progressContainers.forEach((container) => {
        let value = container.getAttribute("value"),
          max = container.getAttribute("max");
        if (value === null || max === null) {
          return;
        }

        container.classList.add("h-auto", "w-auto", "mb-2");

        container.insertAdjacentHTML(
          "beforeend",
          self.getProgressBarElementHTML(value, max)
        );
      });
    },

    getProgressBarElementHTML: function (value, max) {
      // Calculate percentage of the current progress value
      const donePercent = Math.round((value / max) * 100);

      return `<div class="progress-bar progress-bar-striped bg-warning text-dark"
                         aria-valuemin="0"
                         aria-valuenow="${value}"
                         aria-valuemax="${max}"
                         role="progressbar"
                         style="width: ${donePercent}%">
                <span class="mx-2 my-1">${donePercent}% (${value}/${max})</span>
              </div>`;
    },
  },
});
