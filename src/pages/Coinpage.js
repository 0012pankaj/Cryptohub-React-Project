import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from '../outconfig/api';
import axios from 'axios';
import { Typography, makeStyles,LinearProgress  } from '@material-ui/core';
import Coininfo from '../components/Coininfo';
import ReactHtmlParser from "react-html-parser";
// import LinearProgress from '@material-ui/core';
import { numWithCommas } from '../components/Tablecoins';


const useStyles=makeStyles((theme)=>({
  container: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  sidebar: {
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",

    //responsive
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const Coinpage = () => {
  
  const { id } = useParams();
  const [coin,setCoin]=useState();

  const{currency, symbol}= CryptoState();

  //use singlecoin api here we give him id and it give us all info

  const fetchCoin = async() =>{
    const {data}=await axios.get(SingleCoin(id));
    setCoin(data);
  };
  
  // console.log(coin);

  useEffect(()=>{
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const classes=useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#64b5f6" }} />;

  return (
    
    <div className={classes.container}>
      {/* sidebar for coin */}
      <div className={classes.sidebar}>
        <img 
        src={coin?.image.large}
        alt={coin?.name}
        height="170"
        style={{ marginBottom: 20 }}
       />

       <Typography variant='h3' className={classes.heading} style={{color:"#64b5f6"
      }}>
        {coin?.name}
      </Typography>

      <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(".")[0])}.
        </Typography>

        {/* //---------------------------------- */}
        
        <div className={classes.marketData}>

          <span style={{ display: "flex" }}>
               <Typography variant='h5' className={classes.heading} style={{color:"#64b5f6"}}>
                    Rank:
               </Typography>
               &nbsp; &nbsp;
               
               <Typography variant="h5"
                  style={{
                    fontFamily:"Montserrat" ,
                   }}
               >
                 {numWithCommas( coin?.market_cap_rank)}
               </Typography>
               </span>
{/* //----------------------------------------------- */}
               <span style={{display:"flex"}}>
               <Typography variant='h6' className={classes.heading} style={{color:"#64b5f6"}}>
                    Current Price:
               </Typography>
               &nbsp; &nbsp;
               
               <Typography variant='h6'
                  style={{fontFamily:"Montserrat",}}
               >
                {symbol}{" "}
              {numWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
               </Typography>
               </span>
 {/* //-----------------------------------------------------               */}
        

          <span style={{display:"flex"}}>
               <Typography variant='h6' className={classes.heading} style={{color:"#64b5f6"}}>
                Market Cap:
               </Typography>
               &nbsp; &nbsp;
               
               <Typography variant='h6'
                  style={{fontFamily:"Montserrat", }}
               >
                 {symbol}{" "}
              {numWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
              )}M
              
               </Typography>
          </span>

 {/* //----------------------------------------          */}
          
      </div>
  </div>
    
          <Coininfo coin={coin}/>   
    </div>   
  );
  
};

export default Coinpage;
