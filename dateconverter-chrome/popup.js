!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((t = t || self).farvardin = n());
})(this, function () {
  "use strict";
  return {
    isInvalid: function (t, n, r) {
      var o = [t, n, r].find(function (t) {
        return isNaN(t);
      });
      if (isNaN(o) && void 0 !== o) throw new Error("Invalid Arguments passed");
    },
    outputToWhich: function (t, n, r, o) {
      switch (o) {
        case "array":
        default:
          return this.outputToArray(t, n, r);
        case "object":
          return this.outputToObject(t, n, r);
        case "json":
          return this.outputToJson(t, n, r);
        case "string":
          var e = n < 10 ? "0" + n : n,
            i = r < 10 ? "0" + r : r;
          return this.outputToString(t, e, i);
      }
    },
    outputToArray: function (t, n, r) {
      return [t, n, r];
    },
    outputToObject: function (t, n, r) {
      return { year: t, month: n, day: r };
    },
    outputToJson: function (t, n, r) {
      return JSON.stringify(this.outputToObject(t, n, r));
    },
    outputToString: function (t, n, r) {
      return t + "-" + n + "-" + r;
    },
    gregorianToSolar: function (t, n, r, o) {
      var e,
        i,
        u,
        s,
        a,
        p,
        c = 3 < arguments.length && void 0 !== o ? o : "array";
      return (
        (e = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]),
        1600 < t ? ((i = 979), (t -= 1600)) : ((i = 0), (t -= 621)),
        (a = 2 < n ? t + 1 : t),
        (p =
          365 * t + parseInt((a + 3) / 4) - parseInt((a + 99) / 100) + parseInt((a + 399) / 400) - 80 + r + e[n - 1]),
        (i += 33 * parseInt(p / 12053)),
        (p %= 12053),
        (i += 4 * parseInt(p / 1461)),
        365 < (p %= 1461) && ((i += parseInt((p - 1) / 365)), (p = (p - 1) % 365)),
        (u = p < 186 ? 1 + parseInt(p / 31) : 7 + parseInt((p - 186) / 30)),
        (s = 1 + (p < 186 ? p % 31 : (p - 186) % 30)),
        this.isInvalid(i, u, s),
        this.outputToWhich(i, u, s, c)
      );
    },
    solarToGregorian: function (t, n, r, o) {
      var e,
        i = 3 < arguments.length && void 0 !== o ? o : "array",
        u = void 0,
        s = void 0,
        a = void 0,
        p = void 0,
        c = void 0;
      for (
        979 < t ? ((u = 1600), (t -= 979)) : (u = 621),
          p =
            365 * t +
            8 * parseInt(t / 33) +
            parseInt(((t % 33) + 3) / 4) +
            78 +
            r +
            (n < 7 ? 31 * (n - 1) : 30 * (n - 7) + 186),
          u += 400 * parseInt(p / 146097),
          36524 < (p %= 146097) && ((u += 100 * parseInt(--p / 36524)), 365 <= (p %= 36524) && p++),
          u += 4 * parseInt(p / 1461),
          365 < (p %= 1461) && ((u += parseInt((p - 1) / 365)), (p = (p - 1) % 365)),
          a = p + 1,
          e = [0, 31, (u % 4 == 0 && u % 100 != 0) || u % 400 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          s = 0;
        s < 13 && !(a <= (c = e[s]));
        s++
      )
        a -= c;
      return this.isInvalid(u, s, a), this.outputToWhich(u, s, a, i);
    },
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const timezoneSelect = document.getElementById("timezone-select");
  const languageSelect = document.getElementById("language-select");
  if (localStorage.getItem("lang") !== null) {
    languageSelect.value = localStorage.getItem("lang");
  } else {
  }
  if (localStorage.getItem("lang") !== null) {
    timezoneSelect.value = localStorage.getItem("time-zone");
  } else {
  }

  let saveButtonElement = document.getElementById("saveButtonElement");
  function saveButton() {
    localStorage.setItem("time-zone", timezoneSelect.value);
    localStorage.setItem("lang", languageSelect.value);
    langChanger();
  }
  saveButtonElement.addEventListener("click", function () {
    saveButton();
  });

  var body = document.getElementById("body");

  function themeColorSubmit() {
    if (localStorage.getItem("background-color") === "bg-light") {
      body.setAttribute("backcolor", "light");
    } else if (localStorage.getItem("background-color") === "bg-white") {
      body.setAttribute("backcolor", "white");
    } else if (localStorage.getItem("background-color") === "bg-grey") {
      body.setAttribute("backcolor", "grey");
    } else if (localStorage.getItem("background-color") === "bg-mint") {
      body.setAttribute("backcolor", "mint");
    } else if (localStorage.getItem("background-color") === "bg-asphalt") {
      body.setAttribute("backcolor", "asphalt");
    } else {
    }

    if (localStorage.getItem("primary-color") === "pr-orange") {
      body.setAttribute("primarycolor", "orange");
    } else if (localStorage.getItem("primary-color") === "pr-green") {
      body.setAttribute("primarycolor", "green");
    } else if (localStorage.getItem("primary-color") === "pr-blue") {
      body.setAttribute("primarycolor", "blue");
    } else if (localStorage.getItem("primary-color") === "pr-red") {
      body.setAttribute("primarycolor", "red");
    } else if (localStorage.getItem("primary-color") === "pr-purple") {
      body.setAttribute("primarycolor", "purple");
    } else {
    }
  }
  themeColorSubmit();

  if (localStorage.getItem("primary-color") !== null) {
    let currentPrimaryColor = localStorage.getItem("primary-color");
    document.getElementById(currentPrimaryColor).checked = true;
  } else {
  }
  if (localStorage.getItem("background-color") !== null) {
    let currentBackgroundColor = localStorage.getItem("background-color");
    document.getElementById(currentBackgroundColor).checked = true;
  } else {
  }

  if (localStorage.getItem("clock-theme") !== null) {
    let currentClockTheme = localStorage.getItem("clock-theme");
    document.getElementById(currentClockTheme).checked = true;
  } else {
  }

  var toshamsi = document.getElementById("toshamsi");
  var refresh = document.getElementById("refresh");
  const persianNum = document.getElementById("persian-num");
  const autoConvert = document.getElementById("auto-convert");
  const convertExchange = document.getElementById("convert-exchange");
  const convertToShamsi = document.getElementById("converttoshamsi");
  const convertToMiladi = document.getElementById("converttomiladi");
  let convertedDateInput = document.getElementById("converted-date");
  var themeRadioPr = document.querySelectorAll('input[name="themeRadioPr"]');
  var themeRadioBg = document.querySelectorAll('input[name="themeRadioBg"]');
  var clockSwitch = document.querySelectorAll('input[name="clockSwitch"]');

  function handleRadioButtonPr(event) {
    let radioButtonIdPr = event.target.id;
    localStorage.setItem("primary-color", radioButtonIdPr);
    themeColorSubmit();
  }
  function handleRadioButtonBg(event) {
    let radioButtonIdBg = event.target.id;
    localStorage.setItem("background-color", radioButtonIdBg);
    themeColorSubmit();
  }

  function handleRadioButtonCs(event) {
    let radioButtonIdCs = event.target.id;
    localStorage.setItem("clock-theme", radioButtonIdCs);
    clockThemeChanger();
  }

  themeRadioPr.forEach(function (radioButtonPr) {
    radioButtonPr.addEventListener("change", handleRadioButtonPr);
  });
  themeRadioBg.forEach(function (radioButtonBg) {
    radioButtonBg.addEventListener("change", handleRadioButtonBg);
  });

  clockSwitch.forEach(function (radioButtonCs) {
    radioButtonCs.addEventListener("change", handleRadioButtonCs);
  });

  convertToShamsi.addEventListener("click", function () {
    let toShamsiDay = document.getElementById("toshamsi-day").value;
    let toShamsiMonth = document.getElementById("toshamsi-month").value;
    let toShamsiYear = document.getElementById("toshamsi-year").value;
    let convertedDate = farvardin.gregorianToSolar(
      parseInt(toShamsiYear),
      parseInt(toShamsiMonth),
      parseInt(toShamsiDay),
      "string"
    );
    convertedDateInput.setAttribute("placeholder", convertedDate);
  });

  convertToMiladi.addEventListener("click", function () {
    let toMiladiDay = document.getElementById("tomiladi-day").value;
    let toMiladiMonth = document.getElementById("tomiladi-month").value;
    let toMiladiYear = document.getElementById("tomiladi-year").value;
    let convertedDate = farvardin.solarToGregorian(
      parseInt(toMiladiYear),
      parseInt(toMiladiMonth),
      parseInt(toMiladiDay),
      "string"
    );
    convertedDateInput.setAttribute("placeholder", convertedDate);
  });

  convertExchange.addEventListener("click", function () {
    $("#miladi-inputs").toggleClass("hide");
    $("#converttoshamsi").toggleClass("hide");
    $("#shamsi-inputs").toggleClass("hide");
    $("#converttomiladi").toggleClass("hide");
  });

  toshamsi.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (persianNum.checked) {
        chrome.tabs.sendMessage(activeTab.id, { action: "toshamsi", numberFa: true });
      } else {
        chrome.tabs.sendMessage(activeTab.id, { action: "toshamsi", numberFa: false });
      }
    });
  });

  var manualTimeInput = document.getElementById("manual-time-input");
  manualTimeInput.addEventListener("click", function () {
    $("#time-inputs").toggleClass("hide");
    $("#current-time-inputs").toggleClass("hide");
  });

  // var convertTimeBtn = document.getElementById("convert-time-btn");
  // convertTimeBtn.addEventListener("click", function () {
  //   if (manualTimeInput.checked) {
  //     console.log($("#hour-conv-input").val());
  //     console.log($("#minute-conv-input").val());
  //     console.log($("#second-conv-input").val());
      
  //   } else {
      
  //     console.log($("#curr-hour-conv-input").val());
  //     console.log($("#curr-minute-conv-input").val());
  //     console.log($("#curr-second-conv-input").val());
  //   }
  // });


  const wrapper = document.querySelector(".wrapper"),
    selectBtn = wrapper.querySelector(".select-btn"),
    searchInp = wrapper.querySelector("input"),
    options = wrapper.querySelector(".options");

  

  let countries = {
    Los_Angeles: "-7",
    Phoenix: "-7",
    Guatemala: "-6",
    Chicago: "-5",
    Mexico_City: "-6",
    New_York: "-4",
    Caracas: "-4",
    Santiago: "-4",
    Sao_Paulo: "-3",
    London: "+1",
    GMT: "0",
    Berlin: "+2",
    Paris: "+2",
    Budapest: "+2",
    Warsaw: "+2",
    Istanbul: "+3",
    Beirut: "+3",
    Baghdad: "+3",
    Moscow: "+3",
    Tbilisi: "+4",
    Yerevan: "+4",
    Dubai: "+4",
    Baku: "+4",
    Bangkok: "+7",
    Shanghai: "+8",
    Singapore: "+8",
    Seoul: "+9",
    Tokyo: "+9",
    Sydney: "+10",
    Beijing: "+8",
    Rome: "+2",
    Cairo: "+2",
    Mumbai: "+5:30",
    Toronto: "-4",
    Calgary: "-6",
    Montréal: "-4",
    Ottawa: "-4",
    Vancouver: "-7",
    Rio_de_Janeiro: "-3",
    Buenos_Aires: "-3",
    Madrid: "+2",
    Amsterdam: "+2",
    Hong_Kong: "+8",
    Athens: "+3",
    Stockholm: "+2",
    Frankfurt: "+2",
    Hamburg: "+2",
    Jakarta: "+7",
    Prague: "+2",
    Vienna: "+2",
    Brussels: "+2",
    Oslo: "+2",
    Helsinki: "+3",
    Lisbon: "+1",
    Abu_Dhabi: "+4",
    Auckland: "+12",
    Brasília: "-3",
    Doha: "+3",
  };

  const countriesArr = [];

  for (const key in countries) {
    // if (key === "ddd") {
    countriesArr.push(key);
    // }
  }


  function addCountry(selectedCountry) {
    console.log(countries);
    options.innerHTML = "";
    for (const country in countries) {
      let isSelected = country == selectedCountry ? "selected" : "";
      let li = `<li class="${isSelected}" value="${countries[country]}">${country}</li>`;
      options.insertAdjacentHTML("beforeend", li);
    };
  }
  addCountry();

  function updateName(selectedLi) {
    searchInp.value = "";
    // addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.text();  
     $(".select-btn").attr("value", selectedLi.attr("value"));
  }
function turnOnEventClickCity() {
  $("ul.options li").on("click", function () {
    var clickedElement = $(this);
    updateName(clickedElement);
  });
}
  searchInp.addEventListener("keyup", () => {
    // console.log("countriesArr : ", countriesArr);
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countriesArr
      .filter((data) => {
        // debugger
        return data.toLowerCase().startsWith(searchWord);
      })
      .map((data) => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li class="${isSelected}">${data}</li>`;
      })
      .join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">not found - پیدا نشد</p>`;
    turnOnEventClickCity();
  });

  selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

  turnOnEventClickCity();


  function convertTimeToTimeZone(hours, minutes, seconds, timeZone) {
    // Create a new Date object with the current time
    let currentTime = new Date();

    // Set the hours, minutes, and seconds based on the input
    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(seconds);

    // Get the UTC time in milliseconds
    let utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;

    // Create a new Date object with the UTC time
    let convertedTime = new Date(utcTime + 3600000 * timeZone);

    // Get the converted hours, minutes, and seconds
    let convertedHours = convertedTime.getHours();
    let convertedMinutes = convertedTime.getMinutes();
    let convertedSeconds = convertedTime.getSeconds();

    return { hours: convertedHours, minutes: convertedMinutes, seconds: convertedSeconds };
  }


  $("#convert-time-btn").on("click", function () {
    let currHour;
    let currMinute;
    let currSecond;
    if ($("#time-inputs").hasClass("hide")) {
      currHour = $("#curr-hour-conv-input").val();
      currMinute = $("#curr-minute-conv-input").val();
      currSecond = $("#curr-second-conv-input").val();
    }else{
      currHour = $("#hour-conv-input").val();
      currMinute = $("#minute-conv-input").val();
      currSecond = $("#second-conv-input").val();
    }
    
    let currTz = $(".select-btn").attr("value");
    const convertedTime = convertTimeToTimeZone(currHour, currMinute, currSecond, currTz);

    // console.log(convertedTime.hours+":"+convertedTime.minutes+":"+convertedTime.seconds); // Converted hours

    $("#converted-time").val(convertedTime.hours + ":" + convertedTime.minutes + ":" + convertedTime.seconds);

    // console.log(convertedTime.minutes); // Converted minutes
    // console.log(convertedTime.seconds); // Converted seconds
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

  //tabs
  jQuery(document).ready(function ($) {
    tab = $(".tabs h6 a");

    tab.on("click", function (event) {
      event.preventDefault();
      tab.removeClass("active");
      $(this).addClass("active");

      tab_content = $(this).attr("href");
      $('div[id$="tab-content"]').removeClass("active");
      $(tab_content).addClass("active");
    });
  });
  // calendar

  const monthTemplate = () => /* html */ `
    <div class="days-title"><div id="week-0"></div><div id="week-1"></div>
    <div id="week-2"></div><div id="week-3"></div><div id="week-4"></div><div id="week-5"></div>
    <div id="week-6"></div></div><div class="days"></div>`;
  const dpTemplate = () => /* html */ `
  <div class="date-picker"><div class="head">
      <button class="date-arrows"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg></button>
      <div class='title'><h4 class="hide" id="date-format1-fa"></h4><div class="hide" id="date-format1-en"></div><h4 id="date-format2-fa"></h4><div id="date-format2-en"></div></div>
      <button class="date-arrows"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/></svg></button>
    </div><div class="month"></div></div>`;

  const calendar = document.querySelector(".calendar");
  calendar.innerHTML = dpTemplate();
  const today = moment().locale("fa");

  const currentMonth = today.clone().date(1);
  const vMonth = calendar.querySelector(".month");
  const vTitle1 = calendar.querySelector("#date-format1-fa");
  const vTitleEn1 = calendar.querySelector("#date-format1-en");
  const vTitle2 = calendar.querySelector("#date-format2-fa");
  const vTitleEn2 = calendar.querySelector("#date-format2-en");
  let fDay;
  let lDay;
  const manageMonth = (navigate = "") => {
    const month = document.createElement("div");
    month.innerHTML = monthTemplate();
    switch (navigate) {
      case "next":
        currentMonth.add(1, "months");
        break;
      case "prev":
        currentMonth.subtract(1, "months");
        break;
    }
    // today date

    var ctoday = new Date();
    var cDate = ctoday.getDate();
    var cMonth = ctoday.getMonth() + 1; // Months are zero-based, so we add 1
    var cYear = ctoday.getFullYear();
    let shamsiDate = farvardin.gregorianToSolar(cYear, cMonth, cDate, "string");
    const shamsiDateArr = shamsiDate.split("-");
    vTitle1.textContent = shamsiDateArr[2] + "/" + shamsiDateArr[1] + "/" + shamsiDateArr[0];
    vTitleEn1.textContent = cDate + "/" + cMonth + "/" + cYear;

    fDay = currentMonth.clone();
    lDay = fDay.clone().date(fDay.daysInMonth());
    vTitle2.textContent = fDay.format("MMMM YYYY");
    vTitleEn2.textContent = fDay.clone().locale("en").format("MMMM - ") + lDay.clone().locale("en").format("MMMM YYYY");

    const vDays = month.querySelector(".days");
    const addDay = (d, disabled = false) => {
      const vDay = document.createElement("div"),
        vDayEn = document.createElement("div");
      vDayFa = document.createElement("div");
      vDayFa.textContent = d.date();
      vDayFa.className = "day-fa";
      vDay.className = `${d.isSame(today, "day") ? "today" : ""} ` + `${disabled ? "disable" : ""}`;
      vDayEn.textContent = d.clone().locale("en").date();
      vDayEn.className = "day-en";
      vDay.appendChild(vDayFa);
      vDay.appendChild(vDayEn);
      vDays.appendChild(vDay);
    };

    for (let d = fDay.clone().subtract((fDay.day() + 1) % 7, "days"); d.diff(fDay, "days") <= -1; d.add(1, "days")) {
      addDay(d, true);
    }

    for (let d = fDay.clone(); d.diff(lDay, "days") <= 0; d.add(1, "days")) {
      addDay(d);
    }
    for (
      let d = lDay.clone().add(1, "days");
      d.diff(lDay.clone().add(7 - ((lDay.day() + 1) % 7), "days"), "days") <= -1;
      d.add(1, "days")
    ) {
      addDay(d, true);
    }
    switch (navigate) {
      case "next":
        vMonth.children[0].classList.add("right");
        month.classList.add("left");
        break;
      case "prev":
        vMonth.children[0].classList.add("left");
        month.classList.add("right");
        break;
    }
    vMonth.appendChild(month);
    setTimeout(() => {
      month.className = "";
      vMonth.style.height = month.clientHeight + "px";
    }, 20);
    if (navigate !== "") {
      setTimeout(() => vMonth.children[0].remove(), 500);
    }
  };

  const btns = calendar.querySelectorAll(".head button");
  btns[0].addEventListener("click", () => manageMonth("prev"));
  btns[1].addEventListener("click", () => manageMonth("next"));
  const ss = document.getElementById("ss");
  let dateTabBtn = document.getElementById("date-tab-content-btn");

  function showCal() {
    manageMonth();
    langChanger();
    $(".calendar .head button").css("visibility", "visible");
    dateTabBtn.removeEventListener("click", showCal);
  }
  dateTabBtn.addEventListener("click", showCal);

  ss.addEventListener("click", function () {
    $("#date-format1-fa").toggleClass("hide");
    $("#date-format1-en").toggleClass("hide");
    $("#date-format2-fa").toggleClass("hide");
    $("#date-format2-en").toggleClass("hide");
  });

  

  langSourceFa = {
    versionTitle: "4.0 - DAME",
    menu: ["هوشمند", "تقویم", "زمان", "مبدل", "تنظیمات"],
    smart: {
      info: "اگر در تب فعال مرورگر تاریخ هایی وجود داشته باشه، میتونی همه رو با یه کلیک تبدیل کنی!",
      toSolar: "میلادی به شمسی",
      persianNum: "اعداد فارسی",
      autoConvert: "تبدیل خودکار",
    },
    convert: {
      inputs: ["روز", "ماه", "سال"],
      ofSolar: "شمسی به میلادی",
      toSolar: "میلادی به شمسی",
      inputsTime: ["ساعت", "دقیقه", "ثانیه"],
      citySelect: ["انتخاب شهر", "جستجو", "هیچ شهری پیدا نشد"],
      timeConvertBtn: "تبدیل",
      manualSwitch: "انتخاب دستی",
    },
    setting: {
      primary: "رنگ اصلی",
      background: "رنگ پس زمینه",
      timezone: "منطقه زمانی",
      lang: "زبان",
    },
    date: {
      weekdays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
    },
    forex: {
      back: "بازگشت",
      opneBtn: "ساعات کاری بازار فارکس",
    },
    about: {
      features: ["بدون نیاز به اینترنت", "امنیت قابل اعتماد", "قابلیت های شخصی سازی", "هوشمند برای عملیات های خودکار"],
      copyright: "© " + new Date().getFullYear() + ". تمامی حقوق محفوظ می باشد.",
      btn: "درباره",
    },
  };
  langSourceEn = {
    versionTitle: "DAME - 4.0",
    menu: ["Smart", "Calendar", "Time", "Convert", "Setting"],
    smart: {
      info: "If there are dates in the active tab of the browser, you can convert them all with one click!",
      toSolar: "Gregorian To Solar",
      persianNum: "Persian Numbers",
      autoConvert: "Automatic Conversion",
    },
    convert: {
      inputs: ["Day", "Month", "Year"],
      ofSolar: "Solar To Gregorian",
      toSolar: "Gregorian To Solar",
      inputsTime: ["Hour", "Minute", "Second"],
      citySelect: ["Choose city", "Search", "No cities found"],
      timeConvertBtn: "Convert",
      manualSwitch: "manual select",
    },
    setting: {
      primary: "Primary",
      background: "Background",
      timezone: "Timezone",
      lang: "Language",
    },
    date: {
      weekdays: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    },
    forex: {
      back: "Back",
      opneBtn: "Forex Market Hours",
    },
    about: {
      features: [
        "No internet required",
        "Reliable security",
        "Personalization capabilities",
        "Smart for automatic operations",
      ],
      copyright: "© " + new Date().getFullYear() + ". All Rights Reserved.",
      btn: "ABOUT",
    },
  };

  var htmlTag = document.getElementById("html");
  function langSubmitFa() {
    const footerVersion = document.querySelectorAll(".text-muted");
    const aboutText = document.querySelectorAll(".about-txt");
    $("#menu-title-smart").text(langSourceFa.menu[0]);
    $("#menu-title-date").text(langSourceFa.menu[1]);
    $("#menu-title-time").text(langSourceFa.menu[2]);
    $("#menu-title-convert").text(langSourceFa.menu[3]);
    $("#menu-title-setting").text(langSourceFa.menu[4]);

    $("#smart-info-txt").text(langSourceFa.smart.info);
    $("#toshamsi").text(langSourceFa.smart.toSolar);
    $("#smart-persian-num").text(langSourceFa.smart.persianNum);
    $("#smart-auto-convert").text(langSourceFa.smart.autoConvert);

    $("#converttoshamsi").text(langSourceFa.convert.toSolar);
    $("#converttomiladi").text(langSourceFa.convert.ofSolar);
    $("#convert-day-txt").text(langSourceFa.convert.inputs[0]);
    $("#convert-month-txt").text(langSourceFa.convert.inputs[1]);
    $("#convert-year-txt").text(langSourceFa.convert.inputs[2]);
    $("#convert-hour-txt").text(langSourceFa.convert.inputsTime[0]);
    $("#convert-minute-txt").text(langSourceFa.convert.inputsTime[1]);
    $("#convert-second-txt").text(langSourceFa.convert.inputsTime[2]);
    $("#convert-select-city").text(langSourceFa.convert.citySelect[0]);
    $("#convert-time-btn").text(langSourceFa.convert.timeConvertBtn);
    $("#convert-manual-time").text(langSourceFa.convert.manualSwitch);
    $("#time-convert-select-city-search").attr("placeholder", langSourceFa.convert.citySelect[1]);


    $("#setting-primary-txt").text(langSourceFa.setting.primary);
    $("#setting-back-txt").text(langSourceFa.setting.background);
    $("#setting-tz-txt").text(langSourceFa.setting.timezone);
    $("#setting-lang-txt").text(langSourceFa.setting.lang);

    $("#about-title").text(langSourceFa.versionTitle);
    $("#about-fea-1").text(langSourceFa.about.features[0]);
    $("#about-fea-2").text(langSourceFa.about.features[1]);
    $("#about-fea-3").text(langSourceFa.about.features[2]);
    $("#about-fea-4").text(langSourceFa.about.features[3]);
    $("#about-copyright-txt").text(langSourceFa.about.copyright);

    $("#week-0").text(langSourceFa.date.weekdays[0]);
    $("#week-1").text(langSourceFa.date.weekdays[1]);
    $("#week-2").text(langSourceFa.date.weekdays[2]);
    $("#week-3").text(langSourceFa.date.weekdays[3]);
    $("#week-4").text(langSourceFa.date.weekdays[4]);
    $("#week-5").text(langSourceFa.date.weekdays[5]);
    $("#week-6").text(langSourceFa.date.weekdays[6]);

    $("#forex-tz-txt").text(langSourceFa.forex.opneBtn);
    $("#forex-back-txt").text(langSourceFa.forex.back);

    footerVersion.forEach((element) => {
      element.textContent = langSourceFa.versionTitle;
    });
    aboutText.forEach((element) => {
      element.textContent = langSourceFa.about.btn;
    });

    htmlTag.setAttribute("dir", "rtl");
  }
  function langSubmitEn() {
    const footerVersion = document.querySelectorAll(".text-muted");
    const aboutText = document.querySelectorAll(".about-txt");
    $("#menu-title-smart").text(langSourceEn.menu[0]);
    $("#menu-title-date").text(langSourceEn.menu[1]);
    $("#menu-title-time").text(langSourceEn.menu[2]);
    $("#menu-title-convert").text(langSourceEn.menu[3]);
    $("#menu-title-setting").text(langSourceEn.menu[4]);

    $("#smart-info-txt").text(langSourceEn.smart.info);
    $("#toshamsi").text(langSourceEn.smart.toSolar);
    $("#smart-persian-num").text(langSourceEn.smart.persianNum);
    $("#smart-auto-convert").text(langSourceEn.smart.autoConvert);

    $("#converttoshamsi").text(langSourceEn.convert.toSolar);
    $("#converttomiladi").text(langSourceEn.convert.ofSolar);
    $("#convert-day-txt").text(langSourceEn.convert.inputs[0]);
    $("#convert-month-txt").text(langSourceEn.convert.inputs[1]);
    $("#convert-year-txt").text(langSourceEn.convert.inputs[2]);
    $("#convert-hour-txt").text(langSourceEn.convert.inputsTime[0]);
    $("#convert-minute-txt").text(langSourceEn.convert.inputsTime[1]);
    $("#convert-second-txt").text(langSourceEn.convert.inputsTime[2]);
    $("#convert-select-city").text(langSourceEn.convert.citySelect[0]);
    $("#convert-time-btn").text(langSourceEn.convert.timeConvertBtn);
    $("#convert-manual-time").text(langSourceEn.convert.manualSwitch);
    $("#time-convert-select-city-search").attr("placeholder", langSourceEn.convert.citySelect[1]);


    $("#setting-primary-txt").text(langSourceEn.setting.primary);
    $("#setting-back-txt").text(langSourceEn.setting.background);
    $("#setting-tz-txt").text(langSourceEn.setting.timezone);
    $("#setting-lang-txt").text(langSourceEn.setting.lang);

    $("#about-title").text(langSourceEn.versionTitle);
    $("#about-fea-1").text(langSourceEn.about.features[0]);
    $("#about-fea-2").text(langSourceEn.about.features[1]);
    $("#about-fea-3").text(langSourceEn.about.features[2]);
    $("#about-fea-4").text(langSourceEn.about.features[3]);
    $("#about-copyright-txt").text(langSourceEn.about.copyright);

    $("#week-0").text(langSourceEn.date.weekdays[0]);
    $("#week-1").text(langSourceEn.date.weekdays[1]);
    $("#week-2").text(langSourceEn.date.weekdays[2]);
    $("#week-3").text(langSourceEn.date.weekdays[3]);
    $("#week-4").text(langSourceEn.date.weekdays[4]);
    $("#week-5").text(langSourceEn.date.weekdays[5]);
    $("#week-6").text(langSourceEn.date.weekdays[6]);

    $("#forex-tz-txt").text(langSourceEn.forex.opneBtn);
    $("#forex-back-txt").text(langSourceEn.forex.back);

    footerVersion.forEach((element) => {
      element.textContent = langSourceEn.versionTitle;
    });
    aboutText.forEach((element) => {
      element.textContent = langSourceEn.about.btn;
    });

    htmlTag.setAttribute("dir", "ltr");
  }

  function langChanger() {
    if (localStorage.getItem("lang") === "fa") {
      langSubmitFa();
    } else if (localStorage.getItem("lang") === "za") {
    } else {
      langSubmitEn();
    }
  }

  langChanger();

  function clockDefault(){
    // time

    const allLine = document.querySelectorAll(".line");
    const second = document.querySelector(".sec");
    const minutes = document.querySelector(".min");
    const hours = document.querySelector(".hr");

    allLine.forEach((item, idx) => {
      if ((idx + 1) % 5 === 0) {
        item.dataset.num = (idx + 1) / 5;
      }
    });

    getTime();

    setInterval(getTime, 1000);

    function getTime() {
      let now = new Date();
      let sec;
      let min;
      let hr;
      if (localStorage.getItem("time-zone") !== null) {
        now = now.toLocaleString("en-GB", {
          timeStyle: "medium",
          timeZone: localStorage.getItem("time-zone"),
        });
        now = now.split(":");
        sec = parseInt(now[2]);
        min = parseInt(now[1]);
        hr = parseInt(now[0]);
        // sec = 0;
        // min = 20;
        // hr = 4;
      } else {
        sec = now.getSeconds();
        min = now.getMinutes();
        hr = now.getHours();
      }

      const secFr = sec / 60;
      const minFr = (secFr + min) / 60;
      const hrFr = (minFr + hr) / 12;

      const secRot = secFr * 360;
      const minRot = minFr * 360;
      const hrRot = hrFr * 360;

      second.style.transform = `rotateZ(${secRot}deg)`;
      minutes.style.transform = `rotateZ(${minRot}deg)`;
      hours.style.transform = `rotateZ(${hrRot}deg)`;
    }
    
  }


  function digitalClock(){
    // digital watch

    var time = [, , ,];
    var reloj = document.getElementById("reloj");

    var id = setInterval(update, 1000);

    function update() {
      fecha = new Date();

      if (localStorage.getItem("time-zone") !== null) {
        fecha = fecha.toLocaleString("en-GB", {
          timeStyle: "medium",
          timeZone: localStorage.getItem("time-zone"),
        });
        fecha = fecha.split(":");
        time[0] = fecha[0];
        time[1] = fecha[1];
        time[2] = fecha[2];
      } else {
        time[0] = modtime(fecha.getHours());
        time[1] = modtime(fecha.getMinutes());
        time[2] = modtime(fecha.getSeconds());
      }
      // console.log($("#curr-hour-conv-input"));
      $("#curr-hour-conv-input").val(time[0]);
        $("#curr-minute-conv-input").val(time[1]);
        $("#curr-second-conv-input").val(time[2]);

        reloj.innerHTML =
          '<span class="square" id="h">' +
          time[0] +
          '</span><span class="point">:</span><span class="square" id="m">' +
          time[1] +
          '</span><span class="point">:</span><span class="square" id="s">' +
          time[2] +
          "</span>";
    }

    function modtime(hora) {
      return hora < 10 ? "0" + hora : hora;
    }
  }

  function clockCircleDots(){
    // Utilities
    function rad(deg) {
      return (deg * Math.PI) / 180;
    }
    function pos(x, y, r, deg) {
      return {
        x: (x - r * Math.sin(rad(deg))).toString(),
        y: (y - r * Math.cos(rad(deg))).toString(),
      };
    }
    function stringPos(obj) {
      return obj.x + "," + obj.y;
    }

    var c = Snap("#clock");
    var face = c.circle(256, 256, 256).addClass("f1");

    // Circles
    c.circle(256, 256, 112).attr({ fill: "none", strokeWidth: 4 }).addClass("s2");
    c.circle(256, 256, 192).attr({ fill: "none", strokeWidth: 4 }).addClass("s2");

    // Triangle
    var tri = c.path().addClass("f2 s2").attr({ strokeWidth: 80, strokeLinejoin: "round" });

    // Hands
    var displayStyle = { fontSize: 40, textAnchor: "middle", fontWeight: "bold" };
    var handS = c.g(c.circle(0, 0, 32).addClass("f1"), c.text(0, 14, "00").attr(displayStyle).addClass("f2 displayS"));
    var handM = c.g(c.circle(0, 0, 32).addClass("f1"), c.text(0, 14, "00").attr(displayStyle).addClass("f2 displayM"));

    var handH = c.g(c.circle(0, 0, 32).addClass("f1"), c.text(0, 14, "00").attr(displayStyle).addClass("f2 displayH"));
    handH.transform("t256,256");

    // Time Displays
    function updateTimes(s, m, h) {
      var i,
        elS = document.getElementsByClassName("displayS"),
        elM = document.getElementsByClassName("displayM"),
        elH = document.getElementsByClassName("displayH");

      function pad(num) {
        var str = num.toString();
        return str.length > 1 ? str : "0" + str;
      }

      for (i = 0; i < elS.length; i++) {
        elS[i].innerHTML = pad(s);
      }
      for (i = 0; i < elM.length; i++) {
        elM[i].innerHTML = pad(m);
      }
      for (i = 0; i < elH.length; i++) {
        elH[i].innerHTML = pad(h);
      }
    }

    // Drawing
    var delta,
      lastSecond,
      last = new Date();
    function draw() {
      var now = new Date();
      delta = (now.getTime() - last.getTime()) / 1000;
      last = now;

      var h;
      var m;
      var s;
      if (localStorage.getItem("time-zone") !== null) {
        nowTz = now.toLocaleString("en-GB", {
          timeStyle: "medium",
          timeZone: localStorage.getItem("time-zone"),
        });
        nowTz = nowTz.split(":");

        h = parseInt(nowTz[0]);
        m = parseInt(nowTz[1]);
        s = parseInt(nowTz[2]);
      } else {
        h = now.getHours();
        m = now.getMinutes();
        s = now.getSeconds();
      }

      // var h = now.getHours();
      // var m = now.getMinutes();
      // var s = now.getSeconds();
      var ms = now.getMilliseconds();

      // Progress
      var prog = { ms: ms / 1000 };
      prog.s = (s + prog.ms) / 60;
      prog.m = (m + prog.s) / 60;
      prog.h = (h + prog.m) / 12;

      // Hand Positions
      var p1 = stringPos(pos(256, 256, 192, prog.s * -360));
      var p2 = stringPos(pos(256, 256, 112, prog.m * -360));
      var p3 = stringPos(pos(256, 256, 0, prog.h * -360));

      // Move Hands
      handS.transform("t" + p1);
      handM.transform("t" + p2);
      // handH.transform('t'+p3);

      // Move Triangle
      var triPoints = "M" + p1 + "L" + p2 + "L" + p3 + "Z";
      tri.attr("d", triPoints);

      // Update Displays
      if (s !== lastSecond) {
        updateTimes(s, m, h);
      }
      lastSecond = s;

      window.requestAnimationFrame(draw);
    }

    draw();
  }

  function clockSimple(){
    var currentSec = getSecondsToday();
    // console.log("currentSec : ", currentSec);
    var seconds;
    var minutes;
    var hours;

    if (localStorage.getItem("time-zone") !== null) {
      let nowTt = new Date();
      nowTz = nowTt.toLocaleString("en-GB", {
        timeStyle: "medium",
        timeZone: localStorage.getItem("time-zone"),
      });
      nowTz = nowTz.split(":");

      hours = parseInt(nowTz[0]) * 43200;
      minutes = parseInt(nowTz[1]) * 3600;
      seconds = parseInt(nowTz[2]) * 60;
      // console.log(seconds + "if" + minutes + "if" + hours);
    } else {
      // var seconds = (currentSec / 60) % 1;
      // var minutes = (currentSec / 3600) % 1;
      // var hours = (currentSec / 43200) % 1;

      // setTime(60 * seconds, "second");
      // setTime(3600 * minutes, "minute");
      // setTime(43200 * hours, "hour");
    }

    // console.log("currentSec : ",currentSec);

    var seconds = (currentSec / 60) % 1;
    var minutes = (currentSec / 3600) % 1;
    var hours = (currentSec / 43200) % 1;

    // console.log(seconds + "ss" + minutes + "ss" + hours);

    var seconds = seconds * 60;
    var minutes = minutes * 3600;
    var hours = hours * 43200;

    // console.log(seconds + "ss" + minutes + "ss" + hours);

    setTime(seconds, "second");
    setTime(minutes, "minute");
    setTime(hours, "hour");

    function setTime(left, hand) {
      $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s");
    }

    function getSecondsToday() {
      let now = new Date();

      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      let diff = now - today;
      return Math.round(diff / 1000);
    }
  }

 

  function clockThemeChanger() {
    if (localStorage.getItem("clock-theme") === "circle-dots") {
      if (!$("#clock-default").hasClass("hide")) {
        $("#clock-default").toggleClass("hide");
      }
      if ($("#clock-circle-dots").hasClass("hide")) {
        $("#clock-circle-dots").toggleClass("hide");
      }
      clockCircleDots();
      digitalClock();
    } else if (localStorage.getItem("clock-theme") === "default") {
      if (!$("#clock-circle-dots").hasClass("hide")) {
        $("#clock-circle-dots").toggleClass("hide");
      }
      if ($("#clock-default").hasClass("hide")) {
        $("#clock-default").toggleClass("hide");
      }
      // $("#clock-default").toggleClass("hide");
      clockDefault();
      digitalClock();
    } else {
      $("#clock-default").toggleClass("hide");
      clockDefault();
      // $("#clock-circle-dots").toggleClass("hide");
      // clockCircleDots();
      // $("#clock-simple").toggleClass("hide");
      // clockSimple();

      // $("#clock-gradient").toggleClass("hide");
      // clockGradient();

      digitalClock();
    }
  }

  clockThemeChanger();

  $(".forex-tz-btn").click(function () {
    // $(".form-wrap").css("width", "700px");
    $("body").css("width", "700px");
    $("body").css("height", "600px");
  });
$("#offcanvasForexClose").click(function () {
  // $(".form-wrap").css("width", "375px");
  $("body").css("width", "auto");
  $("body").css("height", "auto");
});
  $(".card-footer").click(function () {
    $("body").css("height", "470px");
  });
  $("#offcanvasAboutClose").click(function () {
    $("body").css("height", "auto");
  });

  $(".card-footer").hover(function () {
    $(this).find(".about-txt").toggleClass("hide");
    $(this).find(".text-muted").toggleClass("hide");
  });






  // const mySwitch = document.getElementById("mySwitch");
  // mySwitch.addEventListener("change", updateInput);

  // // Function to update the input value based on switch state
  // function updateInput(event) {
  //   const output = document.getElementById("output");
  //   const switchState = event.target.checked;

  //   // Assign specific values based on switch state
  //   const value1 = switchState ? "Value A" : "Value X";
  //   const value2 = switchState ? "Value B" : "Value Y";
  //   const value3 = switchState ? "Value C" : "Value Z";

  //   // Update the input value
  //   output.value = value1 + ", " + value2 + ", " + value3;
  // }





});
