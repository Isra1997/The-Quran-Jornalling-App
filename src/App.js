
import { Grid } from '@mui/material';
import './App.css';
import AyaCard from './AyaCard/AyaCard';
import Navbar from './Navbar/Navbar';
import { createTheme , ThemeProvider} from '@mui/material/styles'; 
import Timer from './Timer/Timer';

function App() {
  const theme = createTheme({
    typography:{
      fontFamily:['Roboto']
    },
    palette:{
      primary:{
        main:'#CEBFB3'
      },
      secondary:{
        main:'#535058'
      }
    }
  })


  return (
    <ThemeProvider theme={theme}>
         <Navbar></Navbar>
         <Grid container padding={5} spacing={5} >
           <Grid item xs={12}>
              <AyaCard></AyaCard>
           </Grid>
           <Grid item xs={5.3} />
           <Grid item xs={4}>
              <div>┈••✦☪︎✦••┈┈••✦☪︎✦••┈</div>
           </Grid>
           <Grid item xs={3}/>
           <Grid item xs={6}>
              <Timer></Timer>
           </Grid>
           <Grid item xs={3}/>
         </Grid>
    </ThemeProvider>
  
  );
}

export default App;
