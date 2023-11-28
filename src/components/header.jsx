import React, { useEffect, useState } from "react";
import Select from "react-select";
import goldFetch from "../logic/goldFetch";
import "./styles/header.css";
import { useDispatch } from "react-redux";
import { addArray, clearData } from "../redux/reducers";
const Header = () => {
  const dispatch = useDispatch();
  const [goldCost, setGoldCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedResourse, setSelectedResourse] = useState(null);
  const [selectedEnchantment, setSelectedEnchantment] = useState(null);

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
  // const cityOptions = [
  //   { value: "Caerleon", label: "Caerleon" },
  //   { value: "Lymhurst", label: "Lymhurst" },
  //   { value: "Bridgewatch", label: "Bridgewatch" },
  //   { value: "Martlock", label: "Martlock" },
  //   { value: "Thetford", label: "Thetford" },
  //   { value: "Fort Sterling", label: "Fort Sterling" },
  // ];
  // const customCityStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     color: state.isSelected ? "" : getCityColor(state.data.value),
  //     backgroundColor: state.isSelected
  //       ? getCityColor(state.data.value)
  //       : "#171717",
  //   }),
  //   singleValue: (provided, state) => ({
  //     ...provided,
  //     color: getCityColor(selectedCity?.value),
  //   }),
  // };

  // const getCityColor = (city) => {
  //   switch (city) {
  //     case "Lymhurst":
  //       return "#15E831";
  //     case "Caerleon":
  //       return "#CB171D";
  //     case "Thetford":
  //       return "#E815E1";
  //     case "Bridgewatch":
  //       return "#FFEE49";
  //     case "Martlock":
  //       return "#2CDBFF";
  //     case "Fort Sterling":
  //       return "#E2FEFF";
  //   }
  // };
  const tierOptions = [
    { value: "T1_", label: "T1" },
    { value: "T2_", label: "T2" },
    { value: "T3_", label: "T3" },
    { value: "T4_", label: "T4" },
    { value: "T5_", label: "T5" },
    { value: "T6_", label: "T6" },
    { value: "T7_", label: "T7" },
    { value: "T8_", label: "T8" },
  ];
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

  const resourseOptions = [
    {
      label: "Ресурсы",
      options: [
        { value: "WOOD", label: "Дерево" },
        { value: "ROCK", label: "Камень" },
        { value: "ORE", label: "Руда" },
        { value: "HIDE", label: "Шкура" },
        { value: "FIBER", label: "Хлопок" },
      ],
    },
    {
      label: "Материалы",
      options: [
        { value: "PLANKS", label: "Доски" },
        { value: "STONEBLOCK", label: "Камменые блоки" },
        { value: "METALBAR", label: "Слитки" },
        { value: "LEATHER", label: "Кожа" },
        { value: "CLOTH", label: "Ткань" },
      ],
    },
  ];

  const startSearch = async () => {
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
    for (let i = 0; i < enchantmentOptions.length; i++) {
      middleware =
        middleware +
        selectedTier.value +
        selectedResourse.value +
        enchantmentOptions[i].value +
        ",";
    }
    try {
      result = await fetch(
        baseUrl +
          middleware +
          // selectedTier.value +
          // selectedResourse.value +
          // selectedEnchantment.value +
          baseMidUrl +
          // selectedCity.value +
          baseEndUrl
      );
      result = await result.json();
      console.log(result);
      // if (result[0].buy_price_max == 0) {
      //   console.log("Автозакуп не найден");
      //   return;
      // } else if (result[0].sell_price_min == 0) {
      //   console.log("Товар не найден");
      //   return;
      // }
      dispatch(clearData());
      middleware = "";
      dispatch(addArray(result));
      console.log(`Максимальная цена автозакупа :${result[0].buy_price_max}
Минимальная цена на товар:${result[0].sell_price_min}`);
    } catch (e) {
      console.log(e, "Неправильный запрос");
    }
    // console.log(baseUrl+selectedTier.value+selectedResourse.value+selectedEnchantment.value+baseMidUrl+selectedCity.value+baseEndUrl)
  };
  return (
    <div className="mainDiv">
      <div className="searchDiv">
        {/* <Select
          options={cityOptions}
          styles={customCityStyles}
          onChange={(selectedOption) => setSelectedCity(selectedOption)}
          getOptionValue={(option) => option.value}
        /> */}
        <Select
          options={tierOptions}
          styles={customTierStyles}
          onChange={(selectedOption) => setSelectedTier(selectedOption)}
          getOptionValue={(option) => option.value}
          placeholder="Выберите уровень"
        />

        <Select
          options={resourseOptions}
          onChange={(selectedOption) => setSelectedResourse(selectedOption)}
          placeholder="Выберите ресурс"
        />

        <button onClick={startSearch}>Поиск</button>
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
