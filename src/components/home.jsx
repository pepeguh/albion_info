import React, { useState } from "react";
import './styles/home.css';
import { useSelector } from "react-redux";
const Home = () => {
  let getData=useSelector((state) => state.data)
   const [data, setDontUseThis] = useState(getData)
  let pepe = new Set
  let renderedImages = {};
   
  return(
    
     <div className="main_div">
      <div className="color_div">
        <p className="Bridgewatch">Bridgewatch</p>
        <p className="Caerleon">Caerleon</p>
        <p className="Fort_Sterling">Fort Sterling</p>
        <p className="Lymhurst">Lymhurst</p>
        <p className="Martlock">Martlock</p>
        <p className="Thetford">Thetford</p>

      </div>
      {getData.length!==0?
        <div className="render_div">
  
  {getData[0].map((item, index) => (
  <div className={`item_div ${item.city}`} key={index}>
    {renderedImages[item.item_id] ?
      <div> 
         {item.sell_price_min} {item.buy_price_max}
      </div> 
      :
      <div> 
        <img className="item_img" src={`https://render.albiononline.com/v1/item/${item.item_id}`} alt={item.city} />
         {item.sell_price_min} {item.buy_price_max}
      </div> 
    }
    {renderedImages[item.item_id] = true}
  </div>
))}
        </div>
        :''} 
              
  </div>
  );
};
export default Home;
