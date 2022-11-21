
import {  createTheme, Grid,  ThemeProvider } from '@mui/material';

import './App.css';
import AyaCard from './AyaCard/AyaCard';
import Navbar from './Navbar/Navbar';

function App() {
  const theme = createTheme({
    typography:{
      fontFamily:['Roboto']
    },
    palette:{
      primary:{
        main:'#CEBFB3'
      },
      text:'#535058'
    }
  })


  return (
    <ThemeProvider theme={theme}>
         <Navbar></Navbar>
         <Grid container padding={10}>
           <Grid xs={12}>
              <AyaCard></AyaCard>
           </Grid>
           <Grid xs={12}>
              <div>┈••✦☪︎✦••┈┈••✦☪︎✦••┈</div>
           </Grid>
         </Grid>
    </ThemeProvider>
  
  );
}

export default App;