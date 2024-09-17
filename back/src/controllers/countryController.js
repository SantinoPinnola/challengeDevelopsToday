import axios from "axios";
import getCountryISO3 from "country-iso-2-to-3";

export const getAvailableCountries = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de países" });
  }
};

export const getCountryInfo = async (req, res) => {
  const { code } = req.params;
  const iso3Code = getCountryISO3(code);
  try {
    const [borderData, populationData, flagData] = await Promise.all([
      axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`),
      axios.post(
        "https://countriesnow.space/api/v0.1/countries/population",
        {
          iso3: iso3Code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      ),
      axios.post(
        "https://countriesnow.space/api/v0.1/countries/flag/images",
        {
          iso2: code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      ),
    ]);

    res.json({
      borders: borderData.data.borders,
      population: populationData.data.data,
      flagUrl: flagData.data.data.flag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener la información del país" });
  }
};
