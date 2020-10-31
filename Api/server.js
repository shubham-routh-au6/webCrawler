import express from "express";
import cors from "cors";
import router from "./route/searchRoute.mjs";

const app = express();

const PORT = process.env.PORT || 8080;

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  credentials: true, //to allow cookes from front-end
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
