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

  /*Form requests with PROMISE */

  let form = document.querySelector(".main-form"),
    input = form.querySelectorAll("input");
  let formContact = document.querySelector("#form");
  let inputContact = formContact.querySelectorAll("input");
  function sendForm(elem, input, event) {
    event.preventDefault();
    let message = {
      loading: "Loading...",
      succes: "Thank you! We will call you soon",
      failure: "Something go bad :(",
    };
    let statusMessage = document.createElement("div");
    statusMessage.classList.add("status");
    elem.appendChild(statusMessage);

    let formData = new FormData(elem);
    function postData(data) {
      return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "./server.php");
        request.setRequestHeader(
          "Content-type",
          "application/json; charset=utf-8"
        );
        request.addEventListener("readystatechange", () => {
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4 && request.status == 200) {
            resolve();
          } else {
            reject();
          }
        });

        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        console.log(obj);
        let json = JSON.stringify(obj);
        request.send(json);

        //request.send(data);
      });
    }
    function clearInput() {
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
    }
    postData(formData)
      .then(() => {
        statusMessage.innerHTML = message.loading;
      })
      .then(() => {
        statusMessage.innerHTML = message.succes;
      })
      .catch(() => {
        statusMessage.innerHTML = message.failure;
      })
      .then(clearInput);
  }
  form.addEventListener("submit", () => {
    sendForm(form, input, event);
  });
  formContact.addEventListener("submit", () => {
    sendForm(formContact, inputContact, event);
  });

  /*Contact form without promise*/

  // console.log(formContact, inputContact);
  // formContact.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   formContact.appendChild(statusMessage);
  //   let request = new XMLHttpRequest();
  //   request.open("POST", "./server.php");
  //   request.setRequestHeader("Content-type", "application/json; charset=utf-8");

  //   let formData = new FormData(formContact);

  /*TO SAVE DATA IN JSON FORMAT*/
  //   let obj = {};
  //   formData.forEach(function (value, key) {
  //     obj[key] = value;
  //   });
  //   console.log(obj);
  //   let json = JSON.stringify(obj);
  //   request.send(json);

  //   request.addEventListener("readystatechange", () => {
  //     if (request.readyState < 4) {
  //       statusMessage.innerHTML = message.loading;
  //     } else if (request.readyState === 4 && request.status == 200) {
  //       statusMessage.textContent = message.succes;
  //     } else {
  //       statusMessage.textContent = message.failure;
  //     }
  //   });
  //   for (let i = 0; i < input.inputContact; i++) {
  //     inputContact[i].value = "";
  //   }
  // });
});
