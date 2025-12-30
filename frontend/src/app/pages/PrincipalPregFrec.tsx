import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import type { IpreguntasFrecuentes } from "../models/IpreguntasFrecuentes";

export const PrincipalPregFrec = () => {
  const { preguntas = [] } = useSelector(
    (state: RootState) => state.preguntasFrecuentes
  );

  return (
    <>
      <Card
        style={{
          marginTop: "20px",
          backgroundColor: "#008F9E",
          color: "whitesmoke",
          borderRadius: "20px",
        }}
      >
        <CardActionArea>
          <CardContent id="preguntasFrecuentes">
            <Typography gutterBottom variant="h4" component="div">
              Preguntas Frecuentes
            </Typography>
            {preguntas &&
              preguntas.map((pregunta: IpreguntasFrecuentes) => (
                <div key={pregunta.id} style={{ marginBottom: "16px" }}>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {pregunta.pregunta}
                  </Typography>
                  <Typography variant="h6">{pregunta.respuesta}</Typography>
                </div>
              ))}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
