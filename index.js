const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.quill.com/hanging-file-folders/cbk/122567.html");

  const productsHandles = await page.$$(".SearchResultsNew");

  var i = 0;

  for (const producthandle of productsHandles) {
    let ProductName = "Null";
    let ProductPrice = "Null";
    let ItemNumber = "Null";
    let ModelNumber = "Null";
    let ProductDescription = "Null";
    let img = "Null";
if(i<10){
    try {
        ProductName = await page.evaluate(
        (el) => el.querySelector("#skuName").textContent,
        producthandle
      );
    } catch (error) {}

    try {
        ProductPrice = await page.evaluate(
        (el) => el.querySelector(".priceupdate").textContent,
        producthandle
      );
    } catch (error) {}
    try {
      ItemNumber = await page.evaluate(
        (el) => el.querySelector(".iNumber ").textContent,
        producthandle
      );
    } catch (error) {}

    try {
      ModelNumber = await page.evaluate(
        (el) => el.querySelector(".model-number ").textContent,
        producthandle
      );
    } catch (error) {}


    try {
      ProductDescription = await page.evaluate(
        (el) => el.querySelector(".skuBrowseBullets").textContent,
        producthandle
      );
    } catch (error) {}

    try {
      img = await page.evaluate(
        (el) => el.querySelector("#SkuPageMainImg").getAttribute("src"),
        producthandle
      );
    } catch (error) {}
    
    i++
  }
    if (ProductName !== "Null") {
      fs.appendFile(
        "Products.csv",
        `{ \n ProductName : ${ProductName}, \n ProductPrice : ${ProductPrice}, \n ItemNumber : ${ItemNumber}, \n ModelNumber : ${ModelNumber}, \n ProductDescription : ${ProductDescription}, \n Image : ${img} \n}\n\n`,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }

  await browser.close();

})();
