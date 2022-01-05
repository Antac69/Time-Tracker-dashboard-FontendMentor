document.addEventListener("DOMContentLoaded", async () => {
  await getData();
  await printData();
});
const fragment = document.createDocumentFragment();
const template_card = document.getElementById("card").content;
const dashboard_cards = document.querySelector(".dashboard_cards");
const filtro = document.getElementById("filtros");
let bd;
const getData = async () => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    bd = data;
  } catch (error) {
    console.log(error);
  }
};

const printData = (filter = "weekly") => {
  dashboard_cards.innerHTML = ``;
  Object.values(bd).forEach((element) => {
    template_card.querySelector(".card").classList = `card card--${element[
      "title"
    ]
      .toLocaleLowerCase()
      .replace(" ", "-")}`;
    template_card.querySelector(
      ".card_icon img"
    ).src = `./images/icon-${element["title"]
      .toLocaleLowerCase()
      .replace(" ", "-")}.svg`;
    template_card.querySelector(".card_info-title").innerText = element.title;
    template_card.querySelector(
      ".hours"
    ).innerText = `${element["timeframes"][filter]["current"]}hrs`;
    template_card.querySelector(
      ".time"
    ).innerText = `${element["timeframes"][filter]["previous"]}hrs`;
    if (filter === "weekly") {
      template_card.querySelector(".type").innerText = "Week";
    } else if (filter === "daily") {
      template_card.querySelector(".type").innerText = "Day";
    } else {
      template_card.querySelector(".type").innerText = "Month";
    }
    const clone = template_card.cloneNode(true);
    fragment.appendChild(clone);
  });
  dashboard_cards.appendChild(fragment);
};

filtro.addEventListener("input", () => {
  const filtro = document.querySelector("[type='radio']:checked").value;
  printData(filtro);
});