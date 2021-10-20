const axios = require("axios");
const cheerio = require("cheerio");

async function getAds(url, total) {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const listItems = $(".ui-search-results--without-disclaimer ol li");
  const nextPage = $(".ui-search-pagination ul li")

  const nextPageLink = $(nextPage).find(".andes-pagination__button--next > a").attr("href")
  let ads = []
  let getAdsPromises = []

  listItems.each(async (index, element) => {

    if (index >= total) {
      return false;
    }
    const ad = {
      title: "",
      price: 0,
      image: "",
    };

    ad.title = $(element)
      .find(".ui-search-item__title")
      .text();
    ad.price = $(element)
      .find(".ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line")
      .find(".price-tag-fraction")
      .text();
    ad.image = $(element).find(".slick-active > img").attr("data-src");

    ads.push(ad);
  });

  if(ads.length < total){
    const newTotal = total - ads.length
    let ads1 = await getAds(nextPageLink, newTotal, ads)
    ads.push(...ads1)
  }

  return ads
}

function assembleUrl(query){
  return `https://lista.mercadolivre.com.br/${query}`
}

async function resolveAds(){
  const url = assembleUrl("Galaxy S21")
  const res = await getAds(url, 45)
  // console.log(res)
}

resolveAds()

