import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

// const preparePageForTests = async (page) => {

//   const userAgent =
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
//     "AppleWebKit/537.36(KHTML, like Gecko) Chrome/87.0.4272.0 Safari/537.36";
//   await page.setUserAgent(userAgent);
// };

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await preparePageForTests(page);

  await page.goto(
    "https://www.imdb.com/search/title/?count=20&groups=top_1000&sort=user_rating"
  );

  const textContent = await page.evaluate(() => {
    try {
      return Array.from(document.querySelectorAll(".mode-advanced")).map(
        (check) => [
          {
            imageUrl: check
              .querySelector("div:nth-child(2)>a>img")
              .getAttribute("src"),
            movie_name: check.querySelector("div:nth-child(3)>h3>a")
              .textContent,
            genre: check
              .querySelector("div:nth-child(3)>p>span.genre")
              .textContent.slice(1, -1)
              .trim(),
            duration: check.querySelector("div:nth-child(3)>p>span.runtime")
              .textContent,
            imdb_Rating: check
              .querySelector("div:nth-child(3)>div.ratings-imdb-rating")
              .textContent.slice(18, -5),
            metaScore: check
              .querySelector("div:nth-child(3)>div.ratings-metascore")
              .textContent.slice(1, -39),
          },
        ]
      );
    } catch (e) {
      console.log(e.message);
    }
  });
  var newArr = [];
  for (let i = 0; i < textContent.length; i++) {
    newArr = newArr.concat(textContent[i]);
  }

  writeFileSync("./data.json", JSON.stringify(newArr));

  browser.close();
})();
