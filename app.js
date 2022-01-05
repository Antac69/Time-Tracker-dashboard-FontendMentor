document.addEventListener("DOMContentLoaded", async()=>{
    await getData();
    await printData();
});
const fragment = document.createDocumentFragment();
const template_card = document.getElementById('card').content;
const dashboard_cards = document.querySelector('.dashboard_cards');
let bd;
const getData = async()=>{
    try{
        const res = await fetch('./data.json');
        const data = await res.json();
        bd = data;
    }catch(error){
        console.log(error);
    }
}

const printData = (object = bd,filter = 'weekly')=>{
    dashboard_cards.innerHTML=``;
    Object.values(object).forEach(element => {
        template_card.querySelector('.card').classList =`card card--${element['title'].toLocaleLowerCase().replace(' ', '-')}`
        template_card.querySelector('.card_icon img').src = `./images/icon-${element['title'].toLocaleLowerCase().replace(' ', '-')}.svg`;
/*         element['timeframes'][filter][0]
        element['timeframes'][filter][1] */
        const clone = template_card.cloneNode(true);
        fragment.appendChild(clone);
    });
    dashboard_cards.appendChild(fragment);
}