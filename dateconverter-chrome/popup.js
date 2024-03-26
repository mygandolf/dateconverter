document.addEventListener("DOMContentLoaded", function () {
  var toshamsi = document.getElementById("toshamsi");
  var refresh = document.getElementById("refresh");
  const persianNum = document.getElementById("persian-num");

  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.executeScript(tabs[0].id, { file: "agent.js" });
  // });

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

  // Check the switch state
  // toshamsi.addEventListener("click", function () {
  //   if (persianNum.checked) {
  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       chrome.tabs.executeScript(tabs[0].id, { file: "toshamsi-fa.js" });
  //     });
  //   } else {
  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       chrome.tabs.executeScript(tabs[0].id, { file: "toshamsi-en.js" });
  //     });
  //   }
  // });

  // refresh.addEventListener("click", function () {
  //   const element = document.getElementById("refresh-icon");
  //   element.classList.add("rotating");
  //   setTimeout(function () {
  //     element.classList.remove("rotating");
  //   }, 500);
  //   chrome.tabs.reload();
  // });

  // // Get the current active tab
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   const activeTab = tabs[0];
  //   console.log("activeTab : ", activeTab);

  //   // Send data to the content script
  //   // (async () => {
  //   //   const response = await chrome.tabs.sendMessage(activeTab.id, { data: "Hello from popup" });
  //   //   // do something with response here, not outside the function
  //   //   console.log(response);
  //   // })();
  //   chrome.tabs.sendMessage(activeTab.id, { data: "Hello from popup" });
  // });
});
