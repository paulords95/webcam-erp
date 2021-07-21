import "./App.css";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useParams } from "react-router-dom";

function Page() {
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    (async () => {
      setLoading(true);
      const data = await fetch(`http://localhost:1000/webcam/${id}`);
      const img = await data.json();
      setImgSrc(img.toString());
      setLoading(false);
    })();
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
          <div>{info}</div>
          <div>
            <Button
              className="btn"
              variant="contained"
              color="primary"
              onClick={async () => {
                const data = await fetch(
                  `http://localhost:1000/webcam/save/${id}`
                );
                if ((await data.json()) == "Salvo") {
                  setInfo("Salvo com sucesso");

                  alert("Salvo com sucesso");
                  window.top.close();
                } else {
                  setInfo(
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

export default Page;
