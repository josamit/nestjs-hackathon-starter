import { Box, Heading } from '@twilio-paste/core'
import { useEffect } from 'react'
import api from '../core/api'

const Home = () => {

  useEffect(() => {
    api.get("/").then(res => console.log(res)).catch(err => console.error(err))
  }, [])

  return (
    <div className="container">
      <Box marginTop="space120" marginBottom="space120" alignContent="center">
        <Heading as={'h1'} variant={'heading10'}>Hello!</Heading>
      </Box>
    </div>
  );
};

export default Home;
