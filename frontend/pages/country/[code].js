import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PopulationChart from "../components/PopulationChart";

const CountryInfo = () => {
  const [countryInfo, setCountryInfo] = useState(null);
  const router = useRouter();
  const { code } = router.query;
  console.log("EL CODE ES", code);

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:5000/api/countries/${code}`)
        .then((res) => res.json())
        .then((data) => setCountryInfo(data));
    }
  }, [code]);

  if (!countryInfo) return <p>Cargando...</p>;
  console.log("LA COUNTRY INFO ES", countryInfo.population.country);
  return (
    <div>
      <h1>{JSON.stringify(countryInfo.population.country)}</h1>
      <img src={countryInfo.flagUrl} />
      <h2>Países Fronterizos</h2>
      <ul>
        {countryInfo.borders.map((border) => (
          <li key={border.countryCode}>{border.commonName}</li>
        ))}
      </ul>
      <h2>Historial de Población</h2>
      <PopulationChart populationData={countryInfo.population} />
    </div>
  );
};

export default CountryInfo;
