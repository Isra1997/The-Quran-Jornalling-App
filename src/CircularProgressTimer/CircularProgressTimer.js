import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressTimer({minutes , secounds, timeSpend}){
    return(
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={200} variant="determinate" value={timeSpend} color="primary" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography  variant="h6" component="div" color="secondary">
          {`${Math.round(minutes)} min ${Math.round(secounds)} sec `}
        </Typography>
      </Box>
    </Box>)
}