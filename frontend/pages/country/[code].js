import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PopulationChart from "../components/PopulationChart";
import {
  Container,
  Typography,
  List,
  ListItem,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { Button, Link } from "@mui/material";

const CountryInfo = () => {
  const [countryInfo, setCountryInfo] = useState(null);
  const router = useRouter();
  const { code } = router.query;
  console.log("EL CODE ES", code);

  useEffect(() => {
    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/countries/${code}`)
        .then((res) => res.json())
        .then((data) => setCountryInfo(data));
    }
  }, [code]);

  if (!countryInfo) return <p>Cargando...</p>;
  console.log("LA COUNTRY INFO ES", countryInfo.population.country);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {countryInfo.population.country}
          </Typography>
          <img
            src={countryInfo.flagUrl}
            alt={`Bandera de ${countryInfo.population.country}`}
            width={150}
          />

          <Typography variant="h5" gutterBottom>
            Países Fronterizos
          </Typography>
          <List>
            {countryInfo.borders.map((border) => (
              <ListItem key={border.countryCode}>
                <Typography variant="body1">{border.commonName}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" gutterBottom>
            Historial de Población
          </Typography>
          <PopulationChart populationData={countryInfo.population} />
        </Box>
        <Button variant="contained" color="secondary">
          <Link href="/">Volver a la lista de países</Link>
        </Button>
      </Container>
    </Grid>
  );
};

export default CountryInfo;
