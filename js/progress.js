pageInitCallbacks.push(initProgressIndicators);

function initProgressIndicators() {
  let progressContainers = document.querySelectorAll("#progress");
  if (progressContainers.length === 0) {
    return;
  }

  progressContainers.forEach(function (container) {
    let name = container.getAttribute("name"),
      value = container.getAttribute("value"),
      max = container.getAttribute("max");
    if (name === null || value === null || max === null) {
      return;
    }

    createAndAppendProgressElement(container, name, value, max);
  });
}

function createAndAppendProgressElement(container, name, value, max) {
  let progress = document.createElement("progress");
  (progress.id = name), (progress.value = value), (progress.max = max);
  container.appendChild(progress);

  container.appendChild(
    createProgressLabelElement(name, `${value}/${max}`, {
      "margin-left": "8px",
    })
  );
}

function createProgressLabelElement(name, text, styles = {}) {
  let label = document.createElement("label");
  label.appendChild(document.createTextNode(text));
  label.setAttribute("for", name);

  let stylesString = "vertical-align: top;";
  for (const [key, value] of Object.entries(styles)) {
    stylesString += `${key}: ${value};`;
  }
  label.setAttribute("style", stylesString);

  return label;
}
