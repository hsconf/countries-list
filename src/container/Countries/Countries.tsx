import React, { useState, useEffect } from 'react';
import CountriesItem from './CountriesItem';

interface Country {
    alpha3Code: string;
    name: string;
    flag: string;
}

interface CountryDetail extends Country {
    capital: string;
    region: string;
    population: number;
    borders: string[];
}

const Countries: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<CountryDetail | null>(null);

    useEffect(() => {
        fetch('https://restcountries.com/v2/all?fields=alpha3Code,name,flag')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleCountrySelect = (code: string) => {
        fetch(`https://restcountries.com/v2/alpha/${code}`)
            .then(response => response.json())
            .then(data => setSelectedCountry(data))
            .catch(error => console.error('Error fetching country:', error));
    };

    return (
        <div id="container" style={{ display: 'flex', maxWidth: '800px', margin: '0 auto' }}>
            <div id="country-list" style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
                <h3>Выберите страну</h3>
                <ul>
                    {countries.map(country => (
                        <li key={country.alpha3Code} onClick={() => handleCountrySelect(country.alpha3Code)} style={{ cursor: 'pointer' }}>
                            {country.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div id="country-info" style={{ width: '70%', padding: '10px' }}>
                {selectedCountry ? (
                    <CountriesItem
                        name={selectedCountry.name}
                        capital={selectedCountry.capital}
                        region={selectedCountry.region}
                        population={selectedCountry.population}
                        borders={selectedCountry.borders}
                        flag={selectedCountry.flag}
                    />
                ) : (
                    <p>Выберите страну</p>
                )}
            </div>
        </div>
    );
};

export default Countries;
