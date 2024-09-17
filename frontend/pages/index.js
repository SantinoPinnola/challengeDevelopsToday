import { useEffect, useState } from "react";
import Link from "next/link";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/countries/available")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  console.log(countries);
  return (
    <div>
      <h1>Lista de Países</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link href={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
