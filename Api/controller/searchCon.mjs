import * as fs from "fs";

const controller = {};

controller.all = (req, res) => {
  fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
    if (err) return res.status(500).send("Server error");
    const allData = JSON.parse(data);
    console.log(allData[2].genre);
    res.status(200).json(allData);
  });
};

controller.search = (req, res) => {
  const input = req.body.searchValue.toLowerCase();

  fs.readFile("./data.json", { encoding: "utf-8" }, function (err, data) {
    if (err) return res.status(500).send("Server error");
    const allData = JSON.parse(data);
    let finalData = [];
    let count = 0;
    allData.find(function (post) {
      const checkArr = [];
      checkArr.push(post);
      checkArr.forEach(function (arrayItem) {
        if (arrayItem.movie_name.toLowerCase() === input) {
          return finalData.push(arrayItem);
        } else if (arrayItem.genre.toLowerCase().includes(input)) {
          return finalData.push(arrayItem);
        } else if (arrayItem.imdb_Rating === input) {
          return finalData.push(arrayItem);
        } else {
          return count++;
        }
      });
    });
    console.log(count);
    if (count === 20) {
      return res.status(200).json("Not found");
    } else {
      return res.status(200).json(finalData);
    }
  });
};

export default controller;
