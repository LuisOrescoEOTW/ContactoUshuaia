import React from "react";
import { Box } from "@mui/system";

interface Props {
  phoneNumber: string; // Número de teléfono en formato sin 0 y sin 15
}

export const WhatsAppLink: React.FC<Props> = ({ phoneNumber }) => {
  const message = "Buenas, gracias a Contacto Ushuaia me comuniqué contigo. Solicito ";

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, "");
  };

  const encodeMessage = (message: string) => {
    return encodeURIComponent(message);
  };

  const cleanNumber = "+549" + formatPhoneNumber(phoneNumber);
  const encodedMessage = encodeMessage(message);

  const whatsappUrl = `https://wa.me/${cleanNumber}${
    message ? `?text=${encodedMessage}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={`Enviar mensaje a ${phoneNumber} por WhatsApp`}
    >
      <Box
        component="img"
        src="../src/app/images/whatsappIcon.png"
        sx={{
          width: {
            xs: 30,
            md: 60,
          },
          height: "auto",
          cursor: "pointer",
        }}
      />
    </a>
  );
};
