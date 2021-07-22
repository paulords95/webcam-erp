const path = require("path");
const mv = require("mv");
const fs = require("fs");

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

const savePicToPath = (name) => {
  const currentPath = path.join(__dirname, "../", `${name}.jpeg`);
  const destinationPath = path.join(
    `\\\\note085.quimtia.net.br\\c$\\pics\\${currentDate()}`,
    `${name}.jpg`
  );

  fs.access(
    `\\\\note085.quimtia.net.br\\c$\\pics\\${currentDate()}`,
    (error) => {
      if (!error) {
        mv(currentPath, destinationPath, function (err) {
          if (err) {
            return "Nenhuma foto";
          } else {
            return "Salvo";
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
                return "Salvo";
              }
            });
          }
        );
      }
    }
  );
};

module.exports = savePicToPath;
