import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export const PrincipalAcercaDe = () => {
  return (
    <>
      <Card
        style={{
          backgroundColor: "#008F9E",
          color: "whitesmoke",
          borderRadius: "20px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              id="acercaDelSitio"
              gutterBottom
              variant="h4"
              component="div"
            >
              Acerca del sitio
            </Typography>
            <Typography variant="h6">
              El gran misterio: la gente con un desastre en casa (o en la obra)
              no encuentra a la gente que sabe cómo arreglarlo. En
              <span style={{ fontWeight: "bold" }}> Ushuaia</span>, el pase de
              datos de plomeros, puntores, electricistas y demás es por el
              método prehistórico del boca en boca. ¡Pero eso se acabó. Esto es
              <span style={{ fontWeight: "bold" }}> CONTACTO Ushuaia</span>. Su
              única misión es meter toda esa info en un solo lugar y que
              encontrar a un experto sea mas fácil que pelar una papa. Sobre
              todo, cuando el caos es inminente: ese tablero que echa chispas,
              el temido olor a gas, o el manantial que acaba de brotar de tu
              pared.
            </Typography>
            <Typography variant="h6">
              <span style={{ fontWeight: "bold" }}>CONTACTO Ushuaia </span>
              actúa únicamente como una plataforma de publicación e informativa
              para poner en contacto a potenciales clientes con contratistas
              independientes.
            </Typography>
            <Typography variant="h6">
              <span style={{ fontWeight: "bold" }}>CONTACTO Ushuaia </span>
              no se responsabiliza, bajo ninguna circunstancia, por la calidad,
              ejecución, legalidad o cumplimiento de los trabajos o servicios
              contratados por el cliente al contratista. Al utilizar esta
              plataforma, el cliente y el contratista aceptan expresamente que
              <span style={{ fontWeight: "bold" }}> CONTACTO Ushuaia </span>
              queda exonerado de toda responsabilidad legal, financiera y
              material derivada de sus interacciones y acuerdos privados.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
