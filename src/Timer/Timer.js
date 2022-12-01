import { Accordion,Typography,AccordionDetails,AccordionSummary, Grid, Button } from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

import { useState } from "react";
import CircularProgressTimer from "../CircularProgressTimer/CircularProgressTimer";

export default function Timer(){
    const [minutes,setMinutes] = useState(4);
    const [secounds,setSecounds] = useState(59);
    

    return(<>
    <Accordion>
        <AccordionSummary
          expandIcon={<AddCircleTwoToneIcon color="primary"/>}
        >
          <Typography>Show Timer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container padding={5} spacing={5} >
            <Grid  item xs={4}/>
            <Grid  item xs={8}>
               <CircularProgressTimer minutes={minutes} secounds={secounds} timeSpend={100}></CircularProgressTimer>
            </Grid>
            <Grid  item xs={1.5}/>
            <Grid  item xs={3}>
                <Button variant="contained" color="primary">
                    <PlayCircleTwoToneIcon style={{ padding:5}}/> Start Timer
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" color="secondary">
                    <PauseCircleFilledTwoToneIcon style={{ padding:5}}/> Stop Timer
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button variant="outlined" color="secondary">
                    <RestartAltTwoToneIcon style={{ padding:5}}/> Reset Timer
                </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
    </>
        
    )
}