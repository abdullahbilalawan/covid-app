import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";

function App() {
      // app instead of App using Block Element Modifier

      const [countries, setCountries] = useState(["Pakistan", "USA", "IRAN"]);
      const [country, setCountry] = useState(['worldwide'])
      
      useEffect(() => {   
         const getCountriesData = async() => {
         fetch('https://disease.sh/v3/covid-19/countries/')
         .then((response) =>   response.json())
         .then((data) =>{
            const countries = data.map((country) => (
                  {name: country.country,
                   value: country.countryInfo.iso2,  
                  }
            ))
         setCountries(countries);   
        })
        
      };
      getCountriesData();
      }, [] )

      const onCountryChange = async(event) =>{
            const countryCode =  event.target.value;
            console.log(countryCode)   
            setCountry(countryCode)    
      }
      
      return (
            <div className="app">
                  
                  <div className="app__header">
                        <h1> Covid Visualizer</h1>
                        <FormControl className="app__dropdown">
                              <Select variant="outlined" onChange = {onCountryChange} value={country}>
                                    <MenuItem value = "worldwide">
                                          Worldwide
                                    </MenuItem>
                                    {countries.map((country) => (
                                          <MenuItem value={country.value}>
                                                {country.name}
                                          </MenuItem>
                                    ))}
                              </Select>
                        </FormControl>
                  </div>

                  <div className = "app__stats">
                        <InfoBox title= "Corona Virus Cases" total={1000} cases={123} />
                        <InfoBox title= "Recovered"  total={1000} cases={123} />
                        <InfoBox title= "Deaths"  total={1000} cases={123} />


                  </div>
            </div>
      );
}

export default App
