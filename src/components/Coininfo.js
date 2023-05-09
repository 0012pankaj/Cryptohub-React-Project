import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../outconfig/api';
import axios from 'axios';
import { ThemeProvider, createTheme, makeStyles ,CircularProgress} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartD } from '../outconfig/Data';
import Sbutton from './Sbutton';
//fixing the error of category
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  } from 'chart.js';
import { chartDays } from '../outconfig/Data';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );


const useStyle=makeStyles((theme)=>({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}))

const Coininfo = ({coin}) => {
  const[historicData,setHistoricData]=useState();
  const [days,setDays]=useState(1);
  const{currency}=CryptoState();

 
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // setflag(true);
    setHistoricData(data.prices);
  };
  console.log('data',historicData);

  useEffect(()=>{
    fetchHistoricData();
     // eslint-disable-next-line
  },[currency,days]);
  
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
     
 
 const classes=useStyle();
  return(
    <ThemeProvider theme={darkTheme}>
 <div className={classes.container}>
{!historicData ? (
          <CircularProgress
            style={{ color: "#64b5f6" }}
            size={250}
            thickness={1}
          />
        ) :(<>
       <Line
  data={{
    labels: historicData
      ? historicData.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        })
      : [],
    datasets: historicData
      ? [
          {
            data: historicData.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "#64b5f6",
          },
        ]
      : [],
  }}options={{
    elements: {
      point: {
        radius: 1,
      },
    },
  }}
/>
<div
style={{
  display: "flex",
  marginTop: 20,
  justifyContent: "space-around",
  width: "100%",
}}>
  {
    chartD.map((day)=>(
      <Sbutton
        key={day.value}
        onClick={()=> setDays(day.value )}
        selected ={day.value === days}
      >{day.label}</Sbutton>
    ))
  }
</div>


       </>)
  }


 </div>
    </ThemeProvider>
  )
};

export default Coininfo;
