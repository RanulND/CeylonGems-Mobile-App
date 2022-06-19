import React, { createContext, useContext, useEffect, useState } from 'react';
import { Text, DeviceEventEmitter } from 'react-native'
import { getAllGems, getHomeDirectGems} from '../services/GemService';
import { getHomeAuctionGems } from '../services/AuctionService';
import { getHomeJewelry } from '../services/JewelleryService';

// const ProductContext = createContext({
//     auctionGems: null,
//     directGems: null,
//     jewelry: null,
// });

// const productContextProvider = ({childern}) => {
//     const [auctionGems, setAuctionGems] = useState([]);
//     const [directGems, setDirectGems] = useState([]);
//     const [jewelry, setJewelry] = useState([]);

//     useEffect(() => {
//         function getAuctionGems() {
//             getHomeAuctionGems().then(
//                 (res)=>{
//                     setAuctionGems(res.data);
//                     console.log(res.data)}).catch((err) => {
//                         alert(err.message);
//                     })
//                 }
//                 function getDirectGems() {
//                     getHomeDirectGems().then((res) => {
//                       setDirectGems(res.data);
//                       console.log(res.data)
//                     }).catch((err) => {
//                       alert(err.message);
//                     })
              
//                   }        
//                   function getJewelry() {
//                     getHomeJewelry().then((res) => {
//                       setJewelry(res.data);
//                       console.log(res.data)
//                     }).catch((err) => {
//                       alert(err.message);
//                     })
//                   }
//         getAuctionGems();
//         getDirectGems();
//         getJewelry();
//         },[] )

//         return(
//             <ProductContext.Provider
//                 value={{
//                     auctionGems,
//                     directGems,
//                     jewelry
//                 }}>
//                     {
//                         childern
//                     }
//             </ProductContext.Provider>
//         )
// }

// export default productContextProvider;

// import React, { createContext, userReducer, useState, useEffect} from "react";
// import { getHomeDirectGems} from '../services/GemService';
// import { getHomeAuctionGems } from '../services/AuctionService';
// import { getHomeJewelry } from '../services/JewelleryService';
export const ProductContext = createContext({
    auctionGems: null,
    directGems: null,
    jewelry: null,
});

const ProductContextProvider = ({children}) => {
    const [auctionGems, setAuctionGems] = useState([]);
    const [directGems, setDirectGems] = useState([]);
    const [jewelry, setJewelry] = useState([]);

    useEffect(() => {
        function getAuctionGems() {
          getHomeAuctionGems().then((res) => {
            setAuctionGems(res.data);
            console.log(res.data)
          }).catch((err) => {
            alert(err.message);
          })
        }
        function getDirectGems() {
          getAllGems().then((res) => {
            setDirectGems(res.data);
            console.log(res.data)
          }).catch((err) => {
            alert(err.message);
          })
    
        }
        function getJewelry() {
          getHomeJewelry().then((res) => {
            setJewelry(res.data);
            console.log(res.data)
          }).catch((err) => {
            console.log(err.message);
          })
        }
        function printHello(){
          console.log('hello');
        }
        
        printHello();
        getAuctionGems();
        getDirectGems();
        getJewelry();
    }, [])

    return(
        <ProductContext.Provider value={{
            auctionGems,
            directGems,
            jewelry
        }}>
{
  children
}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;