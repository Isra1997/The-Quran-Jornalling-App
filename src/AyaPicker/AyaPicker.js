import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import Button from '@mui/material/Button';

export default function AyaPicker({aya, setAya}){

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
                console.log(surahsResponse);
                setSurahs(surahsResponse);
               
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllSurahs();
    },[]);

    return(
        <>
         <IconButton  onClick={handleClickOpen}>
              <AddCircleTwoToneIcon ></AddCircleTwoToneIcon>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Aya AyaPicker</DialogTitle>
            <DialogContent>
                <DialogContentText>Please select the aya you want to reflect on.</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleClose}>Select</Button>
            </DialogActions>
        </Dialog>
        </>
       

    )

}