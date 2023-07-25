import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { Stack, Autocomplete, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Typo } from '../../CustomsMuiComp/LabelTypo';
import { FormSubBox } from './FormSubBox';

export const PlaceInfosBox = ({ control, errors, values, setValues }) => {
  const [addresses, setAddresses] = useState([]);
  const [arrivalAddresses, setArrivalAddresses] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  // manage address input with API call
  const handleAddressInput = async (e) => {
    if (e.target.value?.length > 3) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}`
        );
        const data = await response.json();
        const formattedAddresses = data.features.map(
          (feature) => feature.properties
        );
        setAddresses(formattedAddresses);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleArrivalAddressInput = async (e) => {
    if (e.target.value?.length > 3) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${e.target.value}`
        );
        const data = await response.json();
        const formattedAddresses = data.features.map(
          (feature) => feature.properties
        );
        setArrivalAddresses(formattedAddresses);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDepartureAddressSelection = (e, value) => {
    if (value === null) {
      return;
    }
    setValues({
      ...values,
      departure_address: value.name,
      city: value.city,
      zipcode: value.postcode,
    });
  };
  const handleArrivalAddressSelection = (e, value) => {
    if (value === null) {
      return;
    }
    setValues({
      ...values,
      arrival_address: value.name,
      arrival_city: value.city,
      arrival_zipcode: value.postcode,
    });
  };

  return (
    <FormSubBox>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Stack>
          <Typo>Adresse de départ :</Typo>

          <Autocomplete
            id="departure_address"
            size={matches ? 'small' : 'normal'}
            options={addresses}
            // options={addresses.map((address) => address.label)}
            onChange={handleDepartureAddressSelection}
            onInputChange={handleAddressInput}
            renderInput={(params) => (
              <Controller
                name="departure_address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    sx={{ width: '16rem' }}
                    {...params}
                    name="departure_address"
                    placeholder="1 Avenue des Champs-Elysée, 75008 PARIS"
                    helperText={
                      errors?.departure_address
                        ? errors?.departure_address?.message
                        : ''
                    }
                    error={errors?.departure_address ? true : false}
                  />
                )}
              />
            )}
          />
        </Stack>
        <Stack>
          <Typo>Téléphone du contact au départ :</Typo>
          <Controller
            name="departure_phone_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="06 01 02 03 04"
                type="tel"
                sx={{ width: '12rem' }}
                size={matches ? 'small' : 'normal'}
                helperText={
                  errors?.departure_phone_number
                    ? errors?.departure_phone_number?.message
                    : ''
                }
                error={errors?.departure_phone_number ? true : false}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="row" flexWrap="wrap" my={1}>
        <Stack>
          <Typo>Adresse d'arrivée :</Typo>
          <Autocomplete
            id="arrival_address"
            size={matches ? 'small' : 'normal'}
            options={arrivalAddresses}
            onChange={handleArrivalAddressSelection}
            onInputChange={handleArrivalAddressInput}
            renderInput={(params) => (
              <Controller
                name="arrival_address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '16rem' }}
                    {...params}
                    placeholder="1 Avenue des Champs-Elysée, 75008 PARIS"
                    helperText={
                      errors?.arrival_address
                        ? errors?.arrival_address?.message
                        : ''
                    }
                    error={errors?.arrival_address ? true : false}
                  />
                )}
              />
            )}
          />
        </Stack>

        <Stack>
          <Typo>Téléphone du contact pour la livraison :</Typo>
          <Controller
            name="arrival_phone_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="06 01 02 03 04"
                type="tel"
                sx={{ width: '12rem' }}
                size={matches ? 'small' : 'normal'}
                helperText={
                  errors?.arrival_phone_number
                    ? errors?.arrival_phone_number?.message
                    : ''
                }
                error={errors?.arrival_phone_number ? true : false}
              />
            )}
          />
        </Stack>
        <Stack direction="row" flexWrap="wrap">
          <Stack>
            <Typo>Date de départ :</Typo>
            <Controller
              name="departure_date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  sx={{ maxWidth: '16rem' }}
                  size={matches ? 'small' : 'normal'}
                  helperText={
                    errors?.departure_date
                      ? errors?.departure_date?.message
                      : ''
                  }
                  error={errors?.departure_date ? true : false}
                />
              )}
            />
          </Stack>
          <Stack>
            <Typo>Date d'arrivée :</Typo>
            <Controller
              name="arrival_date"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  sx={{ maxWidth: '16rem' }}
                  size={matches ? 'small' : 'normal'}
                  helperText={
                    errors?.arrival_date ? errors?.arrival_date?.message : ''
                  }
                  error={errors?.arrival_date ? true : false}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormSubBox>
  );
};
