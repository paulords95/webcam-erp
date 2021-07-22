import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useParams } from "react-router-dom";

function FaceCam() {
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetch(`http://localhost:1000/webcam/${id}`);
      const img = await data.json();
      setImgSrc(img.toString());
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div>
        <div className="img-div">
          {loading ? <LinearProgress /> : <img src={imgSrc} alt="cam"></img>}
        </div>

        <div className="btns">
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                setLoading(true);
                setImgSrc("");
                const data = await fetch(`http://localhost:1000/webcam/${id}`);

                setImgSrc(await data.json());

                setLoading(false);
              }}
            >
              Tirar nova foto
            </Button>
          </div>
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                const data = await fetch(
                  `http://localhost:1000/webcam/save/${id}`
                );
                if ((await data.json()) === "Salvo") {
                  alert("Salvo com sucesso");
                  window.top.close();
                } else {
                  alert(
                    "Erro ao salvar imagem, tire uma nova foto e tente novamente!"
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

export default FaceCam;
