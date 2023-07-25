import React from 'react';
import { Controller } from 'react-hook-form';

import { useTheme } from '@mui/material/styles';
import { Stack, TextField, useMediaQuery } from '@mui/material';

import { FormSubBox } from './FormSubBox';
import { Typo } from '../../CustomsMuiComp/LabelTypo';

export const SizeInfosBox = ({ control, errors }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <FormSubBox>
      <Typo>Dimensions (en cm) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Controller
          name="length"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Longueur"
              sx={{ width: '8rem' }}
              size={matches ? 'small' : 'normal'}
              helperText={errors?.length ? errors?.length?.message : ''}
              error={errors?.length ? true : false}
            />
          )}
        />
        <Controller
          name="width"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Largeur"
              sx={{ width: '8rem' }}
              size={matches ? 'small' : 'normal'}
              helperText={errors?.width ? errors?.width?.message : ''}
              error={errors?.width ? true : false}
            />
          )}
        />
        <Controller
          name="height"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Hauteur"
              sx={{ width: '8rem' }}
              size={matches ? 'small' : 'normal'}
              helperText={errors?.height ? errors?.height?.message : ''}
              error={errors?.height ? true : false}
            />
          )}
        />
      </Stack>
    </FormSubBox>
  );
};
{
  /* <Stack mx={2}>
          <Typo>Taille :</Typo>
          <Select
            id="demo-simple-select"
            value={size}
            label="none"
            onChange={handleChange}
            sx={{ maxWidth: "36rem", m: 1 }}
          >
            <MenuItem value="S">
              S - Tient dans une boîte à chaussures (téléphone, clés, doudou...)
            </MenuItem>
            <MenuItem value="M">
              M - Tient dans une valise cabine (ordinateur, caisse de vin,
              platine vinyle…)
            </MenuItem>
            <MenuItem value="L">
              L - Environ 4 petites valises cabine (tableau, télévision, lit
              parapluie...)
            </MenuItem>
            <MenuItem value="XL">
              XL - Tient dans un break ou un monospace (commode, fauteuil, table
              basse…)
            </MenuItem>
            <MenuItem value="XXL">
              XXL - Nécessite un petit utilitaire (scooter, armoire, canapé,
              lit…)
            </MenuItem>
          </Select>{" "}
        </Stack> */
}
