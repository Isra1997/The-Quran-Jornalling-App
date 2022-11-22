
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import { useState, useEffect } from 'react';





function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

export default function AyaCard(){

    const [aya,setAya] = useState();
    const [engTrans,setEngTrans] = useState();

    useEffect(
      ()=>{
      async function fetchData(){
        const numberOfRandomSurah = randomNumber(1,114);
        await axios.get(process.env.REACT_APP_API_SURAH_ENDPOINT+numberOfRandomSurah)
        .then(async(surah)=>{
            const numberOfRandomAya = randomNumber(1,surah.data.data.numberOfAyahs);
            const arrayOfPromises = [axios.get(process.env.REACT_APP_API_AYA_ENDPOINT+numberOfRandomSurah+":"+numberOfRandomAya+"/editions/ar.asad"),
            axios.get(process.env.REACT_APP_API_AYA_ENDPOINT+numberOfRandomSurah+":"+numberOfRandomAya+"/editions/en.asad")]
            const result = await Promise.all(arrayOfPromises);
            setAya(result[0].data.data[0]);
            setEngTrans(result[1].data.data[0]);
            console.log(result);
        });
    }
    fetchData();}
    ,[]);

    return (
        <Box sx={{ minWidth: 1000 }}  style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent:'center'
        }}>
          <Card variant="outlined">
          <>
                <CardContent>
                
                <Typography alignSelf="center" variant="h5" gutterBottom>
                    Aya of the Day
                </Typography>
                <Typography variant="h4" component="div" gutterBottom>
                {
                   aya === undefined ? '':
                   aya.text
                }
                </Typography>
                <Typography sx={{ mb: 1.5 }} >
                {
                  aya === undefined ? '': 
                  aya.surah.englishName+ " "+aya.surah.number+":"+aya.numberInSurah
                }
                </Typography>
                <Typography variant="body1">
                    {engTrans === undefined ? '':
                     engTrans.text
                    }
                    
                </Typography>
                </CardContent>
                <CardActions>
                {/* <Button size="small">Learn More</Button> */}
                </CardActions>
            </>
          </Card>
        </Box>
      );
}
