import React, { useState } from "react";
import './styles/home.css';
import { useSelector } from "react-redux";
const Home = () => {
  let getData=useSelector((state) => state.data)
  // const [data, setDontUseThis] = useState(getData)
  // console.log(getData[0][0])
  return(
    
     <div className="main_div">
      <p>{getData.length!==0?getData[0][0].buy_price_max:''}</p>
     {/* <ul>
        {data.map((array, index) => (
          <li key={index}>{JSON.stringify(array)}</li>
        ))}
      </ul> */}
  </div>
  );
};
export default Home;
