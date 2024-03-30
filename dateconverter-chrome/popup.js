document.addEventListener("DOMContentLoaded", function () {
  var toshamsi = document.getElementById("toshamsi");
  var refresh = document.getElementById("refresh");
  const persianNum = document.getElementById("persian-num");
  const autoConvert = document.getElementById("auto-convert");
  

  toshamsi.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (persianNum.checked) {
        chrome.tabs.sendMessage(activeTab.id, { action: "toshamsi" , numberFa: true });
      } else {
        chrome.tabs.sendMessage(activeTab.id, { action: "toshamsi" , numberFa: false });
      }
    });
  });

  refresh.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: "restore" });
    });
  });

  autoConvert.addEventListener("click", function () {
    if (autoConvert.checked) {
      localStorage.setItem("autoConvert", "true");
    } else {
      localStorage.setItem("autoConvert", "false");
    }
  });

  persianNum.addEventListener("click", function () {
    if (persianNum.checked) {
      localStorage.setItem("persianNum", "true");
    } else {
      localStorage.setItem("persianNum", "false");
    }
  });

  if (localStorage.getItem("autoConvert") === "true") {
    autoConvert.checked = true;
  } else {
    autoConvert.checked = false;
  }

  if (localStorage.getItem("persianNum") === "true") {
    persianNum.checked = true;
  } else {
    persianNum.checked = false;
  }

});
