import {Howl} from "howler";
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";



export default function AyaAudioPlay({surahNumber,ayaNumber}){
    const [ayaAudio,setAyaAudio] = useState();
    const [playing,setPlaying] = useState(false);
    

    useEffect(()=>{
        async function loadAudio(){
            try {
                let response = await axios.get(process.env.REACT_APP_API_AYA_AUDIO+surahNumber+":"+ayaNumber+process.env.REACT_APP_API_SHIEK_NAME);
                setAyaAudio(
                    new Howl({
                        src: response.data.data.audio,
                        html5:true,
                        onend:function(){
                            setPlaying(false);
                        }
                    })
                );
            } catch (error) {
                console.log(error);
            }
        }
        loadAudio();
    },[ayaNumber,surahNumber]);

    const playAyaAudio = async() =>{
        setPlaying(true);
        if(ayaAudio.playing() === false){
            ayaAudio.play();
        }
      
    }

    const stopAyaAudio = async() =>{
        setPlaying(false);
        ayaAudio.stop();     
    }

    const renderAudioControls = () =>{
            if(playing){
                return(
                <IconButton onClick={stopAyaAudio}>
                    <PauseCircleFilledTwoToneIcon/>
                 </IconButton>
                )
            }else{
                return(
                <IconButton onClick={playAyaAudio}>
                    <PlayCircleTwoToneIcon/>
                </IconButton>
                )
            }
        }
    

    return(  
        <>
        {renderAudioControls()}
        </>
    )

}