import { AppBar,
   Container, 
   MenuItem,
    Select, 
    Toolbar, 
    Typography, 
    createTheme,
     makeStyles,
      ThemeProvider } from '@material-ui/core'

import React from 'react'
import { useHistory }  from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const usestyle =makeStyles(()=>({
  title: {
    flex: 1,
    color:"#64b5f6",
    fontFamily: "Montserrat",
    fontWeight:"bold",
    cursor:"pointer",
  }


})) 

const darkTheme = createTheme({
  palette: {
    primary:{
      main:"#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  //material ui v4 styling
   const classess= usestyle()
   // react-router-dom v- 5.1.x hook->useHistory()
   const history = useHistory();
   //imort our state from context file

   const {currency,setCurrency} = CryptoState();
   console.log(currency);
//styling

  return (
    <ThemeProvider theme={darkTheme}>
   <AppBar color='transparent' position='static'>
    <Container>
      <Toolbar>
        <Typography onClick={()=> history.push("/")}
         className={classess.title}
         variant='h5'>CryptoHub</Typography>
        <Select 
        variant="outlined" 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        style={{
          width:100,
          height:40,
          marginLeft:15, 
        }}
       
        value={currency}
        onClick={(e)=> setCurrency(e.target.value
          )}
          
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
      </Toolbar>
    </Container> 
     
   </AppBar>
   </ThemeProvider>
  )
}

export default Header;
