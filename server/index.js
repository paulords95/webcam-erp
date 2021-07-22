const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const mv = require("mv");
const cors = require("cors");

app.use(express.json());
app.use(cors());
var NodeWebcam = require("node-webcam");

var opts = {
  callbackReturn: "base64",
  width: 900,
  height: 600,
  output: "jpeg",
  quality: 30,
};

const currentDate = () => {
  const d = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formatBr = d
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("");

  return formatBr;
};

const takePicture = (id) => {
  return new Promise((resolve, reject) => {
    NodeWebcam.capture(`${id}`, opts, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

app.get("/webcam/:id", async (req, res) => {
  const { id } = req.params;
  takePicture(id)
    .then((pic) => {
      res.json(`${pic}`);
    })
    .catch((e) => {
      console.log(e);
      res.send("Não foi possível acessar a câmera");
    });
});

app.get("/webcam/save/:id", async (req, res) => {
  const { id } = req.params;
  const currentPath = path.join(__dirname, "./", `${id}.jpg`);
  const destinationPath = path.join(
    `\\\\note085.quimtia.net.br\\c$\\pics\\${currentDate()}`,
    `${id}.jpg`
  );

  fs.access(
    `\\\\note085.quimtia.net.br\\c$\\pics\\${currentDate()}`,
    (error) => {
      if (!error) {
        mv(currentPath, destinationPath, function (err) {
          if (err) {
            res.json("Nenhuma foto");
          } else {
            res.json("Salvo");
          }
        });
      } else {
        fs.mkdir(
          path.join("\\\\note085.quimtia.net.br\\c$\\pics", `${currentDate()}`),
          (err) => {
            if (err) {
              return console.error(err);
            }
            mv(currentPath, destinationPath, function (err) {
              if (err) {
                console.log(err);
              } else {
                res.json("Salvo");
              }
            });
          }
        );
      }
    }
  );
});

app.use("/onvif", require("./onvif/onvifaccess"));

app.listen(1000, () => {
  console.log(`Servidor rodando na porta 1000`);
});
