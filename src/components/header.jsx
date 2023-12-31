import React, { useEffect, useState } from "react";
import Select from "react-select";
import goldFetch from "../logic/goldFetch";
import "./styles/header.css";
import { useDispatch } from "react-redux";
import { addArray, clearData } from "../redux/reducers";
import { resourseOptions, tierOptions } from "../select components/chooseOptions";
import { customResourseStyles,customTierStyles,getTierColor } from "../select components/customStyles";
import search_img from '../public/search_img.svg'
const Header = () => {
  const dispatch = useDispatch();
  const [goldCost, setGoldCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
   const [selectedTier, setSelectedTier] = useState(null);
  const [selectedResourse, setSelectedResourse] = useState(null);


  const baseUrl = "https://east.albion-online-data.com/api/v2/stats/Prices/";
  const baseMidUrl = `.json?locations=Lymhurst,Fort Sterling,Bridgewatch,Martlock,Thetford,Caerleon`;
  const baseEndUrl = "&qualities=1";
  let enchantmentOptions = [{ value: "", label: "0" }];
  useEffect(() => {
    setIsLoading(true);
    const asFunc = async () => {
      try {
        const result = await goldFetch();
        setGoldCost(result);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    asFunc();
  }, []);
  useEffect(() => {
    if (selectedTier !== null) {
    }
  }, [selectedTier]);
 
   const customResourseStyles={
    option:(provided, state)=>({
      ...provided,
      color:'aliceblue',
      backgroundColor:'#171717'
    }),
    groupHeading: (provided, state) => ({
      ...provided,
      color: 'aliceblue',  
      backgroundColor: '#171717',  
    }),
    group: (provided, state) => ({
      ...provided,
      border: '1px solid gray',
      backgroundColor: '#171717', 
    }),
  }
 const customTierStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "" : getTierColor(state.data.label),
      backgroundColor: state.isSelected
        ? getTierColor(state.data.label)
        : "#171717",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: getTierColor(selectedTier?.label),
    }),
  };
  const getTierColor = (tier) => {
    switch (tier) {
      case "T1":
        return "#575555";
      case "T2":
        return "#817F56";
      case "T3":
        return "#23B94B";
      case "T4":
        return "#23A5B9";
      case "T5":
        return "#B92323";
      case "T6":
        return "#E6972F";
      case "T7":
        return "#F2E534";
      case "T8":
        return "#E4E3E0";
    }
  };

 

  const startSearch = async () => {
    if(selectedTier==undefined||selectedResourse==undefined||selectedTier==null||selectedResourse==null){
      return
    }
    console.log(selectedResourse)
    if (
      selectedTier.label == "T1" ||
      selectedTier.label == "T2" ||
      selectedTier.label == "T3"
    ) {
      enchantmentOptions = [{ value: "", label: "0" }];
    } else {
      if (selectedResourse.value == "ROCK") {
        enchantmentOptions = [
          { value: "", label: "0" },
          { value: "_LEVEL1@1", label: "1" },
          { value: "_LEVEL2@2", label: "2" },
          { value: "_LEVEL3@3", label: "3" },
        ];
      } else if (selectedResourse.value == "STONEBLOCK") {
        enchantmentOptions = [{ value: "", label: "0" }];
      } else {
        enchantmentOptions = [
          { value: "", label: "0" },
          { value: "_LEVEL1@1", label: "1" },
          { value: "_LEVEL2@2", label: "2" },
          { value: "_LEVEL3@3", label: "3" },
          { value: "_LEVEL4@4", label: "4" },
        ];
      }
    }
    let result;
    let middleware = "";
    for(let j=0;j<selectedResourse.length;j++){
      for (let i = 0; i < enchantmentOptions.length; i++) {
        middleware =
          middleware +
          selectedTier.value +
          selectedResourse[j].value +
          enchantmentOptions[i].value +
          ",";
      }
     

    }
    try {
      result = await fetch(
        baseUrl +
          middleware +
          baseMidUrl +
          baseEndUrl
      );
      result = await result.json();
      console.log(result);
        dispatch(clearData());
      middleware = "";
      dispatch(addArray(result));
      console.log(`Максимальная цена автозакупа :${result[0].buy_price_max}
Минимальная цена на товар:${result[0].sell_price_min}`);
    } catch (e) {
      console.log(e, "Неправильный запрос");
    }
  };
  return (
    <div className="mainDiv">
      <div className="searchDiv">
          <Select
          className="tier_select"
          options={tierOptions}
          styles={customTierStyles}
          maxMenuHeight={'720px'}
          onChange={(selectedOption) => setSelectedTier(selectedOption)}
          getOptionValue={(option) => option.value}
          placeholder="Выберите уровень"
        />

        <Select
        className="resourse_select"
          options={resourseOptions}
          isMulti
          maxMenuHeight={'720px'}
          styles={customResourseStyles}
          onChange={(selectedOption) => setSelectedResourse(selectedOption)}
          placeholder="Выберите ресурс"
        />
        <div className="search_div_img">
        <img src={search_img} className="search_img" onClick={startSearch}></img>

        </div>
      </div>
      {isLoading ? (
        <div className="goldCost">Курс золота: Loading...</div>
      ) : (
        <div className="goldCost">Курс золота: {goldCost}</div>
      )}
    </div>
  );
};
export default Header;
