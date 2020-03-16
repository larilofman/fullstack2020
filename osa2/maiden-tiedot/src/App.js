import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetailed = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: country.capital
        }

        axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
                setWeatherData(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, [country])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='128px' alt='Flag' />
            {weatherData ?
                <div>
                    <h2>Weather in {weatherData.location.name}</h2>
                    <p><b>Temperature: </b> {weatherData.current.temperature} ℃</p>
                    <img src={weatherData.current.weather_icons[0]} alt="" />
                    <p><b>Wind: </b> {weatherData.current.wind_speed} from {weatherData.current.wind_dir}</p>
                </div>
                :
                null}


        </div>
    )
}

const Country = ({ country, onClick }) => {

    return (
        <div>
            <span>{country.name}</span>
            <button onClick={onClick}>Show</button>
        </div>
    )
}


const CountryDisplay = ({ countries, setSearch }) => {

    const handleClick = (country) => () => setSearch(country.name)

    if (countries.length === 1) {
        return (
            <CountryDetailed country={countries[0]} />
        )
    } else if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    } else {
        return (
            <div>
                {countries.map(country => <Country key={country.alpha2Code} country={country} onClick={handleClick(country)} />)}
            </div>

        )
    }

}

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <label htmlFor="search">Find countries: </label>
            <input name='search' value={search} onChange={handleSearch} />
            <CountryDisplay countries={countriesToShow} setSearch={setSearch} />
        </div >
    )


}

export default App;
