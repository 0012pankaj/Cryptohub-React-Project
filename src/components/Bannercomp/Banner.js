import { Container, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import Coincarosel from './Coincarosel';

//using mui makestyle for styling
const useStyles = makeStyles(()=> ({
    banner: {
        backgroundImage:"url(./banner5.jpg)",
      
    },
    bannerstyle: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    
  },
    taglinestyle: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  
  Coincarousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },

}))


const Banner = () => {
    //mui 
  const classes=useStyles();

  return (
    <div className={classes.banner}> 
    <Container className={classes.bannerstyle}>
        <div className={classes.taglinestyle}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color:"#64b5f6",
            }}
          >
            CryptoHub
            </Typography>
            
            <Typography variant="subtitle2"
            style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"monsterrat",
            }}>
                Master the world of crypto - get all the info you need in one place!
                </Typography>
       
        </div>
        <Coincarosel />
    </Container>
    </div>
  
  )
}

export default Banner;
