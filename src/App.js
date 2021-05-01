import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
   // app instead of App using Block Element Modifier

   const [countries, setCountries] = useState(["Pakistan", "USA", "IRAN"]);
   const [country, setCountry] = useState(["worldwide"]);
   const [countryInfo, setCountryInfo] = useState({});
   useEffect(() => {
      const getCountriesData = async () => {
         fetch("https://disease.sh/v3/covid-19/countries/")
            .then((response) => response.json())
            .then((data) => {
               const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2,
               }));
               setCountries(countries);
            });
      };
      getCountriesData();
   }, []);

   const onCountryChange = async (event) => {
      const countryCode = event.target.value;
      console.log(countryCode);
      setCountry(countryCode);

      const url = countryCode === 'worldwide'
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
         setCountryInfo(data);
      })

   };

   return (
      <div className="app">
         <div className="app__left">
            <div className="app__header">
               <h1> Covid Visualizer</h1>
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
               <InfoBox title="Corona Virus Cases" total={1000} cases={123} />
               <InfoBox title="Recovered" total={1000} cases={123} />
               <InfoBox title="Deaths" total={1000} cases={123} />
            </div>
         </div>
         <div>
               <Card className="app__right">
                     <h1>Covid Map</h1>
                     
                     <CardContent>
                           <h3>Covid cases Country wise</h3>

                           <h3>Covid cases world wide</h3>
                     </CardContent>

               </Card>


         </div>
      </div>
   );
}

export default App;
