globalComponent.addComponent({
  name: "progress",

  init: function () {
    let progressContainers = document.querySelectorAll("div.progress");
    if (progressContainers.length === 0) {
      return this;
    }

    const self = this;
    progressContainers.forEach(function (container) {
      let value = container.getAttribute("value"),
        max = container.getAttribute("max");
      if (value === null || max === null) {
        return;
      }

      container.classList.add("h-auto", "w-auto", "mb-2");

      container.appendChild(self.createProgressElement(value, max));
    });

    return this;
  },

  createProgressElement: function (value, max) {
    const donePercent = Math.round((value / max) * 100);
    const progressText = document.createElement("span");
    progressText.classList.add("mx-2", "my-1");
    progressText.appendChild(
      document.createTextNode(`${donePercent}% (${value}/${max})`)
    );

    let progressElement = document.createElement("div");
    progressElement.classList.add("progress-bar", "bg-warning", "text-dark");
    progressElement.setAttribute("aria-valuemin", "0");
    progressElement.setAttribute("aria-valuenow", value);
    progressElement.setAttribute("aria-valuemax", max);
    progressElement.setAttribute("role", "progressbar");
    progressElement.setAttribute("style", `width: ${donePercent}%`);
    progressElement.appendChild(progressText);

    return progressElement;
  },
});
