import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, FormControl , InputLabel, Select, MenuItem, OutlinedInput} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Button from '@mui/material/Button';

export default function AyaPicker({surahNumber, ayaNumber, setAya}){

    const [surahs,setSurahs] = useState([]);
    const [open,setOpen] = useState(false);
    const [maxNumberOfAyas,setMaxNumberOfAyas] = useState();
    const [selectedSurahNumber,setSelectedSurahNumber] = useState(surahNumber);
    const [selectedAyaNumber,setSelectedAyaNumber] = useState(ayaNumber);

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
        setSelectedSurahNumber(surahNumber);
        setSelectedAyaNumber(ayaNumber);
    } 
    useEffect(()=>{
        setSelectedAyaNumber(ayaNumber);
    },[ayaNumber])

    useEffect(()=>{
        setSelectedSurahNumber(surahNumber);
    },[surahNumber])

    useEffect(()=>{
        async function fetchAllSurahs(){
            try {
                const surahsResponse = await axios.get(process.env.REACT_APP_API_GET_ALL_SURAH);
                setSurahs(surahsResponse.data.data);
            } catch (error) {
                //TODO: add a logger file and log this error
                console.log(error);
            }
        }
        fetchAllSurahs();
    },[]);

    const handleChangeSurah = async (e) =>{
        e.preventDefault();
        setSelectedSurahNumber(e.target.value);
        setMaxNumberOfAyas(surahs.filter(surah=>surah.number === e.target.value)[0].numberOfAyahs);
        setSelectedAyaNumber(1);
    }

    const handleChangeAya =(e) =>{
        e.preventDefault();
        setSelectedAyaNumber(e.target.value);
    }

    const handleSelectAya = (e) =>{
        e.preventDefault();
        setAya(selectedSurahNumber,selectedAyaNumber);
        setOpen(false);
    }

    return(
        
        <>
        {console.log(ayaNumber)}
        {console.log(surahNumber)}
         <IconButton  onClick={handleClickOpen}>
              <AddCircleTwoToneIcon ></AddCircleTwoToneIcon>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Aya Picker</DialogTitle>
            <DialogContent>
                <DialogContentText>Please select The surah and the number of the aya</DialogContentText>
                <br></br>
                <br></br>
                {/* Surah Dropdown */}
                <FormControl >
                    <InputLabel>Surah</InputLabel>
                    <Select
                        value={selectedSurahNumber}
                        label="Surah"
                        onChange={handleChangeSurah}
                    >
                        {surahs.map(s=><MenuItem key={s.number} value={s.number}>{s.englishName}</MenuItem>)}
                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                {/* AyaCounter */}
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">Aya Number</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={selectedAyaNumber}
                        onChange={handleChangeAya}
                        label="AyaNumber"
                        type={"number"}
                        inputProps= {{ min: 1, max: maxNumberOfAyas} }
                    />
                </FormControl>
            </DialogContent>
           
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleSelectAya}>Select</Button>
            </DialogActions>
        </Dialog>
        </>
       

    )

}