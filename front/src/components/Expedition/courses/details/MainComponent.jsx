import { useRouter } from 'next/router';
import { useFetch } from '@/utils/hooks';
import { useContext } from 'react';
import { AuthContext } from '@/utils/context/auth';

import { CircularProgress, Typography, Alert } from '@mui/material';
import { OutlinedCard } from './OutlinedCard';

export const MainComponent = () => {
  const { userData, isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <>
        <Typography component="h1" my={3} fontSize={24} textAlign="center">
          Détails de la course
        </Typography>
        <Alert severity="error">
          Vous devez être connecté pour accéder aux informations de cette page
        </Alert>
      </>
    );
  }
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFetch(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/deliveries/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.user?.token,
      },
    }
  );

  if (error) {
    router.push('/404');
  }
  return (
    <>
      <Typography component="h1" my={3} fontSize={24} textAlign="center">
        Détails de la course
      </Typography>
      {isLoading ? <CircularProgress /> : <OutlinedCard data={data} />}
    </>
  );
};
