import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function YouAreBtn({ youAre, setYouAre }) {
  const [isOutlined, setIsOutlined] = useState(false);
  const handleClick = (e) => {
    setIsOutlined(!isOutlined);
    if (
      (e.target.textContent === "Expéditeur" && youAre === "deliverer") ||
      (e.target.textContent === "Livreur" && youAre === "expeditor")
    ) {
      setYouAre((c) => {
        return c === "expeditor" ? "deliverer" : "expeditor";
      });
    }
  };

  return (
    <ButtonGroup disableElevation>
      <Button
        onClick={handleClick}
        sx={{ width: 120 }}
        variant={isOutlined ? "outlined" : "contained"}
      >
        Expéditeur
      </Button>
      <Button
        onClick={handleClick}
        sx={{ width: 120 }}
        variant={isOutlined ? "contained" : "outlined"}
      >
        Livreur
      </Button>
    </ButtonGroup>
  );
}
