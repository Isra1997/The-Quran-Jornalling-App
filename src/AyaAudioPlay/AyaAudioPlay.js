import {Howl} from "howler";
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';



export default function AyaAudioPlay({surahNumber,ayaNumber}){

    const playAyaAudio = async() =>{
        let response = await axios.get(process.env.REACT_APP_API_AYA_AUDIO+surahNumber+":"+ayaNumber+process.env.REACT_APP_API_SHIEK_NAME);
        const ayaAudio = new Howl({
          src: response.data.data.audio,
          html5:true
        });
        ayaAudio.play();
  }
    return(  
    <IconButton onClick={playAyaAudio}>
        <VolumeUpTwoToneIcon/>
   </IconButton>)

}