import React, { useState } from "react";
import "./styles/home.css";
import { useSelector } from "react-redux";
const Home = () => {
  let getData = useSelector((state) => state.data);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  let render;
  const handleImageLoad = () => {
    if (!isImageLoaded) {
      setIsImageLoaded(true);
      console.log("Сработало");
    }
  };

  const convertData = (inputData) => {
    if (inputData !== undefined) {
      const result = [];
      const groupedData = inputData.reduce((acc, item) => {
        const key = item.item_id;
        if (!acc[key]) {
          acc[key] = { item_id: key };
        }
        // acc[key][`city${item.city}`] = item.city;
        acc[key][`sell_price_min${item.city}`] = item.sell_price_min;
        return acc;
      }, {});
      for (const key in groupedData) {
        result.push(groupedData[key]);
      }
      return result;
    } else {
      return;
    }
  };
  if (getData.length !== 0) {
    render = convertData(getData[0]);
  }
  console.log(render);

  return (
    <div className="main_div">
      <div className="color_div ">
        <p className="Bridgewatch m_p">Bridgewatch</p>
        <p className="Caerleon m_p">Caerleon</p>
        <p className="Fort_Sterling m_p">Fort Sterling</p>
        <p className="Lymhurst m_p">Lymhurst</p>
        <p className="Martlock m_p">Martlock</p>
        <p className="Thetford m_p">Thetford</p>
      </div>
      {getData.length !== 0 ? (
        <div className="render_div">
          {render.map((item, index) => (
            <div className={`item_div`} key={index}>
              {isImageLoaded ? "" : <span className="loader"></span>}
              <img
                className="item_img"
                src={`https://render.albiononline.com/v1/item/${item.item_id}`}
                alt={<span className="loader"></span>}
                onLoad={handleImageLoad}
              />
              <div className="prices_div">
                <div
                  className={`Bridgewatch ${
                    item.sell_price_minBridgewatch === 0 ? "" : "m_p"
                  }`}
                >
                  {item.sell_price_minBridgewatch == 0
                    ? null
                    : item.sell_price_minBridgewatch}
                </div>
                <div
                  className={`Caerleon ${
                    item.sell_price_minCaerleon === 0 ? "" : "m_p"
                  }`}
                >
                  {item.sell_price_minCaerleon == 0
                    ? null
                    : item.sell_price_minCaerleon}
                </div>
                <div
                  className={`Fort_Sterling ${
                    item[`sell_price_minFort Sterling`] === 0 ? "" : "m_p"
                  }`}
                >
                  {item[`sell_price_minFort Sterling`] == 0
                    ? null
                    : item[`sell_price_minFort Sterling`]}
                </div>
                <div
                  className={`Lymhurst ${
                    item.sell_price_minLymhurst === 0 ? "" : "m_p"
                  }`}
                >
                  {item.sell_price_minLymhurst == 0
                    ? null
                    : item.sell_price_minLymhurst}
                </div>
                <div
                  className={`Martlock ${
                    item.sell_price_minMartlock === 0 ? "" : "m_p"
                  }`}
                >
                  {item.sell_price_minMartlock == 0
                    ? null
                    : item.sell_price_minMartlock}
                </div>
                <div
                  className={`Thetford ${
                    item.sell_price_minThetford === 0 ? "" : "m_p"
                  }`}
                >
                  {item.sell_price_minThetford == 0
                    ? null
                    : item.sell_price_minThetford}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Home;
