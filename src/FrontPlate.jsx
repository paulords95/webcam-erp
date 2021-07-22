import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";

function FrontPlate() {
  const [imgSrcFront, setImgSrcFront] = useState("");
  const [imgSrcBack, setImgSrcBack] = useState("");
  const [loadingFront, setLoadingFront] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setLoadingFront(true);
      const data = await fetch(
        `http://localhost:1000/onvif/placa-frente/${id}`
      );
      const img = await data.json();
      setImgSrcFront(img.toString());
      setLoadingFront(false);
    })();
    (async () => {
      setLoadingBack(true);
      const data = await fetch(`http://localhost:1000/onvif/placa-atras/${id}`);
      const img = await data.json();
      setImgSrcBack(img.toString());
      setLoadingBack(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div>
        <div className="img-div">
          {loadingFront ? (
            <CircularProgress />
          ) : (
            <img src={imgSrcFront} width="500" alt="cam"></img>
          )}
        </div>
        <div className="img-div" style={{ marginTop: 30 }}>
          {loadingBack ? (
            <CircularProgress />
          ) : (
            <img src={imgSrcBack} width="500" alt="cam"></img>
          )}
        </div>

        <div className="btns">
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                setLoadingFront(true);
                setImgSrcFront("");
                const data = await fetch(
                  `http://localhost:1000/onvif/placa-frente/${id}`
                );
                setImgSrcFront(await data.json());
                setLoadingFront(false);
              }}
            >
              Tirar nova foto da frente
            </Button>
          </div>
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                setLoadingBack(true);
                setImgSrcBack("");
                const data = await fetch(
                  `http://localhost:1000/onvif/placa-atras/${id}`
                );
                setImgSrcBack(await data.json());
                setLoadingBack(false);
              }}
            >
              Tirar nova foto de trás
            </Button>
          </div>
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                const data = await fetch(
                  `http://localhost:1000/onvif/save/${id}`,
                  {
                    method: "POST",
                  }
                );
                const response = await data.json();

                if (response.front === "Salvo" && response.back === "Salvo") {
                  alert("Salvo com sucesso");
                  window.top.close();
                } else {
                  alert(
                    "Erro ao salvar imagem, tire novas fotos e tente novamente!"
                  );
                }
              }}
            >
              Gravar Foto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPlate;
