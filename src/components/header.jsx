import React, { useEffect, useState } from "react";
import Select from "react-select";
import goldFetch from "../logic/goldFetch";
import "./styles/header.css";
const Header = () => {
  const [goldCost, setGoldCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null)
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
  const cityOptions = [
    { value: "Caerleon", label: "Caerleon" },
    { value: "Lymhurst", label: "Lymhurst" },
    { value: "Bridgewatch", label: "Bridgewatch"},
    { value: "Martlock", label: "Martlock"},
    { value: "Thetford", label: "Thetford" },
    { value: "Fort Sterling", label: "Fort Sterling" },
  ];
  const customCityStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "" : getCityColor(state.data.value),
      backgroundColor: state.isSelected ? "lightblue" : "#171717",
       }),
    singleValue: (provided, state) => ({
      ...provided,
      color: getCityColor(selectedCity?.value),
    }),
  };

  const getCityColor = (city) => {
    switch (city) {
      case "Lymhurst":
        return "#15E831";
      case "Caerleon":
        return "#CB171D";
      case "Thetford":
        return "#E815E1";
      case "Bridgewatch":
        return "#FFEE49";
      case "Martlock":
        return "#2CDBFF";
      case "Fort Sterling":
        return "#E2FEFF";
    }
  };
  const tierOptions = [
    { value: "T1", label: "T1" },
    { value: "T2", label: "T2" },
    { value: "T3", label: "T3" },
    { value: "T4", label: "T4" },
    { value: "T5", label: "T5" },
    { value: "T6", label: "T6" },
    { value: "T7", label: "T7" },
    { value: "T8", label: "T8" },
];
const customTierStyles ={
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "" : getTierColor(state.data.value),
        backgroundColor: state.isSelected ? "lightblue" : "#171717",
         }),
      singleValue: (provided, state) => ({
        ...provided,
        color: getTierColor (selectedTier?.value),
      }),
  };
  const getTierColor = (city) => {
    switch (city) {
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
  const resourseOptions = [{ value: "Wood", label: "wood" }];

  return (
    <div className="mainDiv">
      <div className="searchDiv">
        <Select
          options={cityOptions}
          styles={customCityStyles}
          onChange={(selectedOption) => setSelectedCity(selectedOption)}
          getOptionValue={(option) => option.value}
        />
        <Select
         options={tierOptions}
         styles={customTierStyles}
         onChange={(selectedOption) => setSelectedTier(selectedOption)}
         getOptionValue={(option) => option.value} />

        <Select options={resourseOptions} />
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
