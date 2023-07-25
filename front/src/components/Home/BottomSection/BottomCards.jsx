import { Box, Stack, Card, CardContent, Typography } from "@mui/material";

const cardsTxt = {
  expeditor: [
    [
      "Déposez une annonce",
      "Dites ce que vous voulez envoyer. Détaillez votre annonce avec l'adresse, les dimensions, le poids et le détail de livraison.",
    ],
    [
      "Recevez des propositions",
      "Les voyageurs vous contactent par texto ou mail. Mettez-vous d'accord sur les détails de livraison (prix, date d'enlèvement et de livraison).",
    ],
    [
      "Validez votre réservation",
      "Réglez en ligne pour bénéficier d'une assurance et suivre votre colis. Votre paiement ne sera versé au voyageur qu'une fois le colis livré.",
    ],
  ],
  deliverer: [
    [
      "Enregistrez vos trajets",
      "Renseignez le ou les trajets sur lesquels vous souhaitez assurer le transport d’objets ou de colis. Bring4you vous adressera des propositions de collecte que vous pouvez accepter ou non.",
    ],
    [
      "Contactez les expéditeurs",
      "Vous pouvez aussi choisir vous-même les demandes de collecte qui vous intéressent, puis vous mettre d’accord avec l’expéditeur sur les détails de la livraison (participation à vos frais de voyage, date d’enlèvement, de collecte…).",
    ],
    [
      "Recevez le paiement",
      "Une fois la livraison réalisée par vous-même, vous recevrez de Bring4you le paiement de la participation à vos frais de transport directement sur votre compte.",
    ],
  ],
};

export const BottomCards = ({ youAre }) => {
  return (
    <Stack
      spacing={{ xs: 1, sm: 2, md: 4 }}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-evenly"
      mx={4}
      my={2}
    >
      {cardsTxt[youAre].map((card, i) => (
        <Card key={`${card}-${i}`} sx={{ width: { sm: "30%" } }}>
          <CardContent>
            <Box>
              {card.map((txt, i) => (
                <Typography
                  key={`${txt}-${i}`}
                  component={"p"}
                  marginBottom={1}
                  fontSize={i === 0 ? 18 : 12}
                >
                  {txt}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
