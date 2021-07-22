const router = require("express").Router();
const onvif = require("node-onvif");
const fs = require("fs");

const savePicToPath = require("./saveToPath");

let frontPlate = new onvif.OnvifDevice({
  xaddr: "http://192.168.8.52/onvif/device_service",
  user: "admin",
  pass: "nuvicam123",
});

let backPlate = new onvif.OnvifDevice({
  xaddr: "http://192.168.8.48/onvif/device_service",
  user: "admin",
  pass: "nuvicam123",
});

const getSnapshot = (cam, name) => {
  return new Promise((resolve, reject) => {
    cam
      .init()
      .then(async (info) => {
        cam
          .fetchSnapshot()
          .then((res) => {
            let ext = "bin";
            let mime_pair = res.headers["content-type"].split("/");
            if (mime_pair[0] === "image") {
              ext = mime_pair[1];
            }
            let fname = `${name}.` + ext;

            fs.writeFileSync(fname, res.body, { encoding: "binary" });
            resolve(res.body);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

router.get("/placa-frente/:id", async (req, res) => {
  const { id } = req.params;
  getSnapshot(frontPlate, `${id}_FRENTE`).then((response) => {
    const pic = `data:image/png;base64, ${response.toString("base64")}`;
    res.json(pic);
  });
});

router.get("/placa-atras/:id", async (req, res) => {
  const { id } = req.params;
  getSnapshot(backPlate, `${id}_TRAS`).then((response) => {
    const pic = `data:image/png;base64, ${response.toString("base64")}`;
    res.json(pic);
  });
});

router.post("/save/:id", (req, res) => {
  const { id } = req.params;
  const saveFront = `${id}_FRENTE`;
  const saveBack = `${id}_TRAS`;
  const saveResponse = savePicToPath(saveFront);
  const saveResponseBack = savePicToPath(saveBack);
  res.json(saveResponse);
});

module.exports = router;
