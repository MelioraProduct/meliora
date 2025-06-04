import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import useAuth from "../redux/useAuth";
import Loading from "../components/Loading";
import { IconUser } from "@tabler/icons-react";

export default function ProfileComponent() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth !== undefined) {
      setIsLoading(false);
    }
  }, [auth]);

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Loading />
      </Container>
    );
  }

  if (auth.isAuthenticated === false) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}>
        <Typography level="h2" color="neutral">
          You need to be logged in to view your profile.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="solid"
            color="primary"
            onClick={() => navigate("/")}>
            Go to Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        </Box>
      </Container>
    );
  }

  const { house, street, city, state, postalCode, country } =
    auth.user.address || {};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #020617, #17BEDB)",
        padding: 3,
      }}>
      <Container maxWidth='md'>
        <Box
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
          }}>
          <Grid container spacing={4} alignItems='center'>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt={auth.user.name}
                src={auth.user.profilePicture || <IconUser />}
                sx={{ width: 128, height: 128, border: "4px solid #17BEDB" }}
              />
            </Grid>

            <Grid item xs={12} sm={8} textAlign={{ xs: "center", sm: "left" }}>
              <Typography level="h4" fontWeight={600} gutterBottom>
                {auth.user.name}
              </Typography>
              <Typography level="body-md" color="neutral">
                {auth.user.email}
              </Typography>
            </Grid>
          </Grid>

          <Box
            mt={4}
            p={3}
            borderRadius={2}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
            <Typography variant='h6' fontWeight={600} gutterBottom>
              Address
            </Typography>
            {auth.user.address ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    House: {house || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    Street: {street || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>City: {city || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>
                    State: {state || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>
                    Postal Code: {postalCode || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>
                    Country: {country || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant='body2'>Address not available.</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
