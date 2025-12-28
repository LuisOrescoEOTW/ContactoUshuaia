import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getPreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";
import type { IpreguntasFrecuentes } from "../models/IpreguntasFrecuentes";

export const PrincipalPregFrec = () => {

  //Leer datos iniciales
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPreguntas());
  }, [dispatch]);

  const { preguntas = [] } = useSelector((state: RootState) => state.preguntasFrecuentes);

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
