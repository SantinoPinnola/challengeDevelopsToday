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

  if (!countryInfo) return <p>Loading...</p>;
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
            alt={`Flag of ${countryInfo.population.country}`}
            width={150}
          />

          <Typography variant="h5" gutterBottom>
            Border countries
          </Typography>
          <List>
            {countryInfo.borders.map((border) => (
              <ListItem key={border.countryCode}>
                <Typography variant="body1">{border.commonName}</Typography>
              </ListItem>
            ))}
          </List>

          <Typography variant="h5" gutterBottom>
            Population History
          </Typography>
          <PopulationChart populationData={countryInfo.population} />
        </Box>
        <Button variant="contained" color="secondary">
          <Link href="/">Go back to the country list</Link>
        </Button>
      </Container>
    </Grid>
  );
};

export default CountryInfo;
