import React, { useEffect, useState } from "react";

import { Header } from "./../CommonComponents/Header";
import { Grid } from "@mui/material";
import { Date } from "./../CommonComponents/Date";
import { getAllDays } from "../services/http.service";
import { toast } from "react-toastify";

export const Home = () => {
  const [Days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = sessionStorage.getItem("email");

  const LoadData = () => {
    getAllDays(user)
      .then((data) => {
        setDays(data.data.dates);
        setLoading(false);
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
        setLoading(false);
      });
  };
  useEffect(() => {
    LoadData();
  }, []);
  return (
    <div>
      <Header />
      <Grid container>
        {!loading ? (
          <>
            {Days.map((data, index) => {
              return (
                <Grid key={index} item xs={4} sm={4} md={2}>
                  <Date day={data} />
                </Grid>
              );
            })}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </Grid>
    </div>
  );
};
