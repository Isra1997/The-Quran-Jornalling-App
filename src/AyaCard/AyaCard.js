
import { CircularProgress, IconButton  } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import axios from 'axios';
import { useState, useEffect } from 'react';
import AyaAudioPlay from '../AyaAudioPlay/AyaAudioPlay';
import AyaPicker from '../AyaPicker/AyaPicker';
import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone';





function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}


export default function AyaCard(){

    const [aya,setAya] = useState();
    const [engTrans,setEngTrans] = useState();

    useEffect(
      ()=>{fetchAya();}
    ,[]);

  const handleRandomAya = () =>{
      fetchAya();
  }


  async function fetchAya(surahNumber, ayaNumber){
    let surah = undefined;
    let aya = undefined;
    if(ayaNumber === undefined || surahNumber === undefined){
      surah = randomNumber(1,114);
      try {
        const surahNumberOfAya = await axios.get(process.env.REACT_APP_API_SURAH_ENDPOINT+surah);
        aya = randomNumber(1,surahNumberOfAya.data.data.numberOfAyahs);
      } catch (error) {
        //TODO: add a logger file in order to locate issues
        console.log(error);
      }
    }else{
      surah = surahNumber;
      aya = ayaNumber;
    }
    const arrayOfPromises = [axios.get(process.env.REACT_APP_API_AYA_ENDPOINT+surah+":"+aya+"/editions/ar.asad"),
    axios.get(process.env.REACT_APP_API_AYA_ENDPOINT+surah+":"+aya+"/editions/en.asad")]
    const result = await Promise.all(arrayOfPromises);
    setAya(result[0].data.data[0]);
    setEngTrans(result[1].data.data[0]);
  }

    return (
        <Box sx={{ minWidth: 1000 }}  style={{
            display: 'flex', 
            alignItems: 'center', 
            alignContent: 'stretch',
            justifyContent:'center'
        }}>
          {
                   aya !== undefined ? 
          <Card variant="outlined">
          <>
                <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                  { aya.text}
                </Typography>
                <Typography sx={{ mb: 1.5 }} >
                {aya.surah.englishName+ " "+aya.surah.number+":"+aya.numberInSurah}
                </Typography>
                <Typography variant="body1">
                    {engTrans.text}
                </Typography>
                </CardContent>
                <CardActions>
                   <AyaPicker surahNumber={aya.surah.number} ayaNumber={aya.numberInSurah} setAya={fetchAya}></AyaPicker>
                   <AyaAudioPlay surahNumber={aya.surah.number} ayaNumber={aya.numberInSurah}></AyaAudioPlay>
                   <IconButton onClick={handleRandomAya} >
                     <CasinoTwoToneIcon/>
                   </IconButton>
                </CardActions>
            </>
          </Card> : <CircularProgress></CircularProgress> }
        </Box>
      );
}
