import React, { useState, useEffect } from "react";
import {
   FormControl,
   MenuItem,
   Select,
   Card,
   CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import "./App.css";
import Table from "./Table";
import { sortData } from "./utils";
import 'leaflet/dist/leaflet.css';

function App() {
   // app instead of App using Block Element Modifier

   const [countries, setCountries] = useState(["Pakistan", "USA", "IRAN"]);
   const [country, setCountry] = useState(["worldwide"]);
   const [countryInfo, setCountryInfo] = useState({});
   const [tableData, setTableData] = useState([]);
   const [mapCenter,setMapCenter] = useState({lat:30.3753,lng:69.3451});
   const [mapZoom, setMapZoom] = useState(6);
   const [mapCountries, setMapCountries] = useState([])
   useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/countries/PK")
         .then((response) => response.json())
         .then((data) => {
            setCountryInfo(data);
         });
   }, []);

   useEffect(() => {
      const getCountriesData = async () => {
         fetch("https://disease.sh/v3/covid-19/countries/")
            .then((response) => response.json())
            .then((data) => {
               const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2,
               }));
               const sortedData = sortData(data);
               setCountries(countries);
               setMapCountries(data);
               setTableData(sortedData);
            });
      };
      getCountriesData();
   }, []);

   const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      console.log(countryCode);
      setCountry(countryCode);

      const url =
         countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
         .then((response) => response.json())
         .then((data) => {
            setCountryInfo(data);

            setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
            setMapZoom(4);
         });
   };

   console.log("COUNTRY INFO  ", countryInfo);

   return (
      <div className="app">
         <div>
            <Card className="app__right">
               <CardContent>
                  <h2>World Covid Stats</h2>
                  
                  <Table countries={tableData}> </Table>
               </CardContent>
            </Card>
         </div>
         <div className="app__left">
            <div className="app__header">
               <h1> Covid Stats Pakistan</h1>
               <FormControl className="app__dropdown">
                  <Select
                     variant="outlined"
                     onChange={onCountryChange}
                     value={country}
                  >
                     <MenuItem value="worldwide">Worldwide</MenuItem>
                     {countries.map((country) => (
                        <MenuItem value={country.value}>
                           {country.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>

            <div className="app__stats">
               <InfoBox
                  title="Corona Virus Cases"
                  total={countryInfo.cases}
                  cases={countryInfo.todayCases}
               />
               <InfoBox
                  title="Recovered"
                  total={countryInfo.recovered}
                  cases={countryInfo.todayRecovered}
               />
               <InfoBox
                  title="Deaths"
                  total={countryInfo.deaths}
                  cases={countryInfo.todayDeaths}
               />
             
            </div>

            <br/>
            <br/>
            <br/>
            <div className="graph">
            <h2>Graph of activity</h2>   
            <LineGraph  />
            </div>
            <Map countries = {mapCountries} center={mapCenter} zoom= {mapZoom} />
            
         </div>
      </div>
   );
}

export default App;
