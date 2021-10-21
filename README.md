# Crawler

This project is a crawler to scrape data from [MercadoLivre](https://www.mercadolivre.com.br/).

## Technologies

[NodeJS](https://nodejs.org/), [Axios](https://www.npmjs.com/package/axios) and [Cheerio](https://www.npmjs.com/package/cheerio)

## Installation
```bash
npm install
```

## Usage

Update line 58 at [index.js](https://github.com/henriquehschmitt1/crawler/blob/main/index.js) for the product and line 59 for the amount of results you'd like

```javascript
//your product here
const url = assembleUrl("Galaxy S21");
//the amount here
const res = await getAds(url, 65);
```
