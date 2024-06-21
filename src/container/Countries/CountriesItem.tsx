import React from 'react';

interface Props {
    name: string;
    capital: string;
    region: string;
    population: number;
    borders: string[];
    flag: string;
}

const CountriesItem: React.FC<Props> = ({ name, capital, region, population, borders, flag }) => {

    const border = borders || [];
    const borderCountries = border.length ? borders.join(', ') : 'Нет граничащих стран';

    return (
        <div>
            <img src={flag} alt={name} style={{width: '200px'}}/>
            <h3>{name}</h3>
            <p><strong>Столица:</strong> {capital}</p>
            <p><strong>Регион:</strong> {region}</p>
            <p><strong>Население:</strong> {population.toLocaleString()}</p>
            <p><strong>Граничит с:</strong> {borderCountries}</p>
        </div>
    );
};

export default CountriesItem;
