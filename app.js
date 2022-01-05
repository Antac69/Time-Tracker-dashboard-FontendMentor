document.addEventListener("DOMContentLoaded", async () => {
  await getData();
  await printData();
});
const fragment = document.createDocumentFragment();
const template_card = document.getElementById("card").content;
const dashboard_cards = document.querySelector(".dashboard_cards");
const options = document.getElementById("filtros");
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
const getTypeFilter ={
  "weekly" : "Week",
  "daily" : "Day",
  "monthly":"Month"
}
const printData = (filter = "weekly") => {
  dashboard_cards.innerHTML = ``;
  Object.values(bd).forEach((element) => {
    const titleNormalice = element["title"].toLocaleLowerCase().replace(" ", "-");
    const currentTime = element["timeframes"][filter]["current"];
    const previousTime = element["timeframes"][filter]["previous"];
    template_card.querySelector(".card").classList = `card card--${titleNormalice}`;
    template_card.querySelector(".card_icon img").src = `./images/icon-${titleNormalice}.svg`;
    template_card.querySelector(".card_info-title").innerText = element.title;
    template_card.querySelector(".hours").innerText = `${currentTime}hrs`;
    template_card.querySelector(".time").innerText = `${previousTime}hrs`;
    template_card.querySelector(".type").innerText = getTypeFilter[filter];
    const clone = template_card.cloneNode(true);
    fragment.appendChild(clone);
  });
  dashboard_cards.appendChild(fragment);
};

options.addEventListener("input", () => {
  const option = document.querySelector("[type='radio']:checked").value;
  printData(option);
});