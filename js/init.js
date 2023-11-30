var pageInitCallbacks = [initTitle];

function onPageInit() {
  if (pageInitCallbacks.length > 0) {
    pageInitCallbacks.forEach(function (callback) {
      callback();
    });
  }

  console.log("Page is initialized!");
}

function initTitle() {
  const name = "ProIT Static Page";
  if (document.title.includes(name)) {
    return;
  }

  document.title = `${document.title} - ${name}` + " (DEV)"; // TODO dev indicator
}
