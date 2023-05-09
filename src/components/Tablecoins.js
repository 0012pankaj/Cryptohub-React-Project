import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../outconfig/api';
import { CryptoState } from '../CryptoContext';
import { Container, TableContainer, TextField, LinearProgress,ThemeProvider, Typography, createTheme, Table, TableHead, TableRow ,TableCell, TableBody, makeStyles,Paper} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

          //  converting number string to number using regex we display ',' in numerical form
           export function numWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

//use coin list api

const useStyles = makeStyles( ()=> ({
  
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#64b5f6",
    },
  },

 }))
const Tablecoins = () => {
  const [coins,setCoins]=useState([]);
  const [loading,setLoading]=useState(false);
  const [search,setSearch]=useState("");
  const history=useHistory();
  //state change for pagination 
  const [page,setPage]=useState(1);

  const {currency,symbol}= CryptoState();

  //featching data using axios
  const fetchcoin = async()=>{
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  console.log(coins);
  
 useEffect(()=>{
  fetchcoin();
    // eslint-disable-next-line
 },[currency]);

 
 const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const handleSearch =()=>{
  return coins.filter(
    (coin)=>
   coin.name.toLowerCase().includes(search) ||
   coin.symbol.toLowerCase().includes(search)
   );
 };


 const classes= useStyles();


return(
  <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18,variant:"h1" ,fontFamily: "Montserrat" ,color:""}}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        

        <TextField
          label="Search For a Crypto Currency.."
          // variant="outlined"
          id="standard-basic"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
       
       <TableContainer >
          {  loading?(
            <LinearProgress style={{ backgroundColor: "#64b5f6" }} />
           ):(
          <Table>
           <TableHead style={{backgroundColor:"#64b5f6" }}>
              
               <TableRow style={{ varient:"h5",}}>
               {["Coin", "Price", "24h %", "Market Cap","24h Volume"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                       
                        height:"8",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}

               </TableRow>
            </TableHead>
             
            <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) =>{
                  const profit=row.price_change_percentage_24h > 0;
                  
                  return(
                    <TableRow 
                    onClick={() => history.push(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name} >
                      
                       {/* column 1 with symbol,coins,coin name*/}
                      <TableCell component='th' scope='row'
                         style={{
                        display:"flex",
                        gap:15,
                      }}>
                      
                      <img 
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{marginBottom:10}}
                        />
                       
                       <div  style={{ display: "flex", flexDirection: "column" }}>
                            <span
                                style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}>
                              {row.symbol}
                            </span>

                            <span style={{ color: "#64b5f6" }}>
                              {row.name}
                            </span>
                        </div>
                        </TableCell>

                     {/* //column 2 with current price */}
                      <TableCell align="right">
                          {symbol}{" "}
                          {numWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                      {/* //column 3 with profit */}
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                       
                           
                       

                        {/* //column 6 with Marketcap */}
                        <TableCell align="right">
                          {symbol}{" "}
                          {numWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )} M
                        </TableCell>

                         {/* //column 5 with total volum */}
                         <TableCell align="right">
                        {symbol}
                        {numWithCommas(row.total_volume.toString().slice(0, -6))} M
                        </TableCell>

                   </TableRow>
                  );
                })}
              </TableBody>

          </Table>

          )
        } 

          </TableContainer > 

          <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count ={(handleSearch()?.length/10).toFixed(0)}
          classes={{ ul: classes.pagination }}
          // scrolling style to pages
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
  
        </Container>
    </ThemeProvider>
)}

 

//  using material ui i get to know about stiling row and pagination


  


export default Tablecoins;
