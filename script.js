window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  //Делаем табы
  const tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");
  const hideTabContent = (a) => {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  };

  const showTabContent = (b) => {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  };

  info.addEventListener("click", (e) => {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  //Timer
  let deadline = "2020-05-30";

  // new Date = date today
  const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date());
    //Get seconds
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor(t / (1000 * 60 * 60));
    // Hours in 24-hours format
    // hours = Math.floor((t / 1000 / 60 / 60) % 24);
    // days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      hours,
      minutes,
      seconds,
    };
  };
  const setClock = (endtime) => {
    let timer = document.querySelector("#timer");
    let hours = document.querySelector(".hours");
    let minutes = document.querySelector(".minutes");
    let seconds = document.querySelector(".seconds");
    //Каждый раз запусукать функцию расчета времени когда включается updateClock
    const updateClock = () => {
      //t - take data from return
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      //Check hours
      if (t.hours < 10 && t.hours > 0) {
        hours.textContent = `0${t.hours}`;
      } else if (t.hours < 0) {
        hours.textContent = `00`;
      } else if (t.hours == 0) {
        seconds.textContent = `00`;
      }

      //Check minutes
      if (t.minutes < 10 && t.minutes > 0) {
        minutes.textContent = `0${t.minutes}`;
      } else if (t.minutes < 0) {
        minutes.textContent = `00`;
      } else if (t.minutes == 0) {
        seconds.textContent = `00`;
      }

      //Check seconds
      if (t.seconds < 10 && t.seconds > 0) {
        seconds.textContent = `0${t.seconds}`;
      } else if (t.seconds < 0) {
        seconds.textContent = `00`;
      } else if (t.seconds == 0) {
        seconds.textContent = `00`;
      }
    };
    setInterval(() => {
      updateClock();
    }, 1000);
  };
  setClock(deadline);

  /* Modal Window */
  let moreBtn = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    closeBtn = document.querySelector(".popup-close");

  //Modal Show
  function showPopup() {
    overlay.style.display = "block";
    this.classList.add("more-splash");
    //Запрет прокрутки страницы
    document.body.style.overflow = "hidden";
  }
  //Modal Hide
  function closePopup() {
    overlay.style.display = "none";
    moreBtn.classList.remove("more-splash");
    document.body.style.overflow = "";
  }
  moreBtn.addEventListener("click", showPopup);
  closeBtn.addEventListener("click", closePopup);

  //Modal for Description
  let descrBtn = document.querySelectorAll(".description-btn");
  descrBtn.forEach((btn) => {
    btn.addEventListener("click", showPopup);
  });
  // for (let i = 0; i < descrBtn.length; i++) {
  //   descrBtn[i].addEventListener("click", showPopup);
  // }
});
