const puppeteer = require("puppeteer");
const fs = require("fs");

const PAGE_URL = "https://abrahamjuliot.github.io/creepjs/";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function scraper() {
  console.log("Scraper Started!");

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    ignoreDefaultArgs: ["--enable-automation"],
    defaultViewport: null,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  let outputData = [];

  // Loop over all URLs
  for (let index = 0; index < 3; index++) {
    let trustScore = "";
    let lies = "";
    let bot = "";
    let fingerprint = "";

    await page.goto(PAGE_URL, { waitUntil: "networkidle2" });
    await sleep(5);

    // Wait for fingerprint to not show "Computing..."
    await page.waitForFunction(
      () => {
        // Select all <strong> elements
        const loaders = Array.from(document.querySelectorAll("strong"));
        // Check every <strong> element to ensure none contain "Loading..."
        return (
          !document
            .querySelector('div[class="ellipsis-all"]')
            .textContent.includes("Computing...") &&
          loaders.every((loader) => loader.textContent.trim() !== "Loading...")
        );
      },
      { polling: "mutation", timeout: 0 } // Use mutation polling to observe changes in the DOM
    );

    // Now that "Computing..." and "Loading..." are gone, proceed to extract the fingerprint
    fingerprint = await page.$eval(
      'div[class="ellipsis-all"]',
      (el) => el.textContent
    );

    // while (true) {
    //   fingerprint = await page.$eval(
    //     'div[class="ellipsis-all"]',
    //     (el) => el.textContent
    //   );
    //   if (fingerprint !== "FP ID: Computing...") {
    //     break;
    //   }
    // }

    let tsNodes = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('div[class="visitor-info"]>div>div>div'),
        (element) => element.textContent
      )
    );
    tsNodes.forEach((element) => {
      if (element.includes("trust score")) {
        trustScore = element.replace("trust score:", "").trim();
      } else if (element.includes("lies")) {
        lies = element.replace("lies (0):", "").trim();
      }
    });

    let botNodes = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('div[class="block-text"]>div'),
        (element) => element.textContent
      )
    );
    botNodes.forEach((element) => {
      if (element.includes("bot")) {
        bot = element.replace("bot:", "").trim();
      }
    });

    let nodeData = {
      trust_score: trustScore,
      lies: lies,
      bot: bot,
      "fingerprint FP ID": fingerprint,
    };

    await page.pdf({
      path: `pdf-${index}.pdf`,
      format: "A4",
      printBackground: true,
    });

    outputData.push(nodeData);
  }

  let json = JSON.stringify(outputData);
  fs.writeFile("output.json", json, function (error) {
    if (error) throw error;
    console.log("File Saved!!! to output.json");
  });

  browser.close();

  console.log("All links has been processed successfully!!!");
}

scraper();
