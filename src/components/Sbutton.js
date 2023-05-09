import { makeStyles } from '@material-ui/core';
import React from 'react'


const useStyle=makeStyles({
    selectBstyle : {
        border: "1px solid #64b5f6",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        
        "&:hover": {
          backgroundColor: "#64b5f6",
          color: "black",
        },
        width: "22%",
        //   margin: 5,
      },

});



const Sbutton = ({children,selected,onClick}) => {

 const classes = useStyle();
 
 
    return (
    <span className={classes.selectBstyle}
    style={{
        backgroundColor: selected ? "#64b5f6" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
    }}
    onClick={onClick}
    >{children}</span>
    
  )
}

export default Sbutton
