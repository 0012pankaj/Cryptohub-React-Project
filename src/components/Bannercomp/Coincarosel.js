import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
// import { } from '../../outconfig';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../../outconfig/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

            //converting number string to number using regex we display ',' in numerical form
export function numWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyle=makeStyles((theme)=>({
  carouselstyle: { //sliding bar styilling
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItemstyle: { //coins in sliding bar
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
}))


const Coincarosel = () => {
     //manage state of tranding using usestate
     const [trending,setTrending]= useState([]);
     const { currency ,symbol}=CryptoState();

   
     //featchingtreandingcoins using axios
     const featchingtreandingcoins = async()=>{
      //adding api endpoint name(TrendingCoins)
     const {data} =await axios.get(TrendingCoins(currency) ) ;
     
     console.log(data);
     setTrending(data);
    };

   

   
    //  console.log(Trending);

     useEffect(() =>{
        featchingtreandingcoins();
         // eslint-disable-next-line
     },[currency]);

     //material ui caroselstyling

const classes =useStyle();

 const items=trending && trending.map((coin)=>{

let profitofcoin=coin?.price_change_percentage_24h >=0;

        return(
            <Link 
            className={classes.carouselItemstyle}
         
            to={`/coins/${coin.id}`}

            >
                <img 
                src={coin?.image}
                alt={coin.name}
                height="70"
                style={{marginBottom: 10}}
                />
                <span>
                  {coin?.symbol}
                  &nbsp;
                  
                   <span  style={{
                    color: profitofcoin > 0 ? "green" : "red",
                    fontWeight:500,
                   }}>
                   {/* // display symbol of coun and it profit percentage */}
                    {profitofcoin && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                   </span>
                </span>
                <span style={{fontSize: 22,fontWeight: 500 ,color:''}}>
                 {symbol}{numWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });
     const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 5,
        },
      };

  return (
     <div  className={classes.carouselstyle} >
      <AliceCarousel
       mouseTracking
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       items={items}
       autoPlay
       />
    </div>
  );
};

export default Coincarosel;
