import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  List,
  ListItem,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/countries/available")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  console.log(countries);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Lista de Países
        </Typography>
        {/* Caja para hacer la lista scrolleable */}
        <Box
          sx={{
            maxHeight: "400px", // Altura máxima para la caja
            overflowY: "auto", // Habilitar scroll vertical
            border: "1px solid #e0e0e0", // Opcional: para darle un borde
            padding: "10px",
            borderRadius: "8px", // Bordes redondeados
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Sombra ligera
          }}
        >
          <List>
            {countries.map((country) => (
              <ListItem key={country.countryCode}>
                <Link href={`/country/${country.countryCode}`}>
                  <Typography variant="body1" color="primary">
                    {country.name}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Grid>
  );
};

export default CountriesList;
