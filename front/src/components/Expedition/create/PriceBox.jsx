import React from 'react';
import { Controller } from 'react-hook-form';

import { Stack, TextField, useMediaQuery } from '@mui/material';

import { FormSubBox } from './FormSubBox';
import { Typo } from '../../CustomsMuiComp/LabelTypo';
import { useTheme } from '@mui/material/styles';

export const PriceBox = ({ control, errors }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <FormSubBox>
      <Typo>Indiquer le prix proposé pour la prestation (en euros) :</Typo>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Controller
          name="price"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <TextField
              {...field}
              type={'number'}
              placeholder="Prix en €"
              sx={{ width: '8rem' }}
              size={matches ? 'small' : 'normal'}
              helperText={errors?.price ? errors?.price?.message : ''}
              error={errors?.price ? true : false}
            />
          )}
        />
      </Stack>
    </FormSubBox>
  );
};
