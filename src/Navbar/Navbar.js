import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';





export default function ElevateAppBar(props) {
  return (
    <>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" marginLeft={10}>
             The Quran Journaling App ✨
            </Typography>
          </Toolbar>
        </AppBar>
        
      <Toolbar />
    </>
  );
}
