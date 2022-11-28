import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, FormControl , InputLabel, Select, MenuItem, OutlinedInput} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Button from '@mui/material/Button';

export default function AyaPicker({surahNumber, ayaNumber, setAya}){

    const [surahs,setSurahs] = useState([]);
    const [open,setOpen] = useState(false);

    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    } 

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

    const handleChangeSurah =(e) =>{
        e.preventDefault();
        console.log(e.target.value);
    }

    const handleChangeAya =(e) =>{
        e.preventDefault();
        console.log(e.target.value);
    }

    return(
        <>
         <IconButton  onClick={handleClickOpen}>
              <AddCircleTwoToneIcon ></AddCircleTwoToneIcon>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            {console.log(surahNumber)}
            <DialogTitle>Aya Picker</DialogTitle>
            <DialogContent>
                <DialogContentText>Please select The surah and the number of the aya</DialogContentText>
                <br></br>
                <br></br>
                {/* Surah Dropdown */}
                <FormControl >
                    <InputLabel>Surah</InputLabel>
                    <Select
                        value={surahNumber}
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
                        value={ayaNumber}
                        onChange={handleChangeAya}
                        label="AyaNumber"
                        type={"number"}
                    />
                </FormControl>
            </DialogContent>
           
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleClose}>Select</Button>
            </DialogActions>
        </Dialog>
        </>
       

    )

}