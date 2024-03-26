document.addEventListener("DOMContentLoaded", function () {
  var toshamsi = document.getElementById("toshamsi");
  var refresh = document.getElementById("refresh");
  const persianNum = document.getElementById("persian-num");

  // Check the switch state
  toshamsi.addEventListener("click", function () {
    if (persianNum.checked) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "toshamsi-fa.js" });
      });
    }else{
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "toshamsi-en.js" });
      });
    }
  });
  
  
  refresh.addEventListener("click", function () {
    const element = document.getElementById("refresh-icon");
    element.classList.add("rotating");
    setTimeout(function () {
      element.classList.remove("rotating");
    }, 500);
    chrome.tabs.reload();
  });

});
