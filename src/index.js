let button = document.querySelector("button");
let input = document.querySelector("input");
let inpCon = document.querySelector("span");
let vals = document.querySelectorAll(".vals");
let myRegExp =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

//fetching data from the api
button.addEventListener("click", async () => {
  let thh = myRegExp.test(input.value);
  if (thh == true) {
    try {
      let myApi = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_C0xQAwQBHzO6CxL1LGFprfGeuLK2C&ipAddress=${input.value}`
      );

      let myObj = await myApi.json();
      console.log(myObj);
      vals[0].innerHTML = `${myObj.ip}`;
      vals[1].innerHTML = `${myObj.location.region}`;
      vals[2].innerHTML = `UTC ${myObj.location.timezone}`;
      vals[3].innerHTML = `${myObj.isp}`;
      let map = L.map("map").setView(
        [myObj.location.lat, myObj.location.lng],
        13
      );
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      let greenIcon = L.icon({
        iconUrl: "../images/icon-location.svg",

        iconSize: [35, 40],
      });

      let marker = L.marker([myObj.location.lat, myObj.location.lng], {
        icon: greenIcon,
      }).addTo(map);
    } catch (err) {
      console.error(err);
    }
  } else {
    input.style.border = " 1px solid red";
  }
});
