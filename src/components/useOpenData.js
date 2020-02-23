import React, { useState, useEffect } from "react";

const useOpenData = () => {
  const [hasError, setErrors] = useState(false);
  const [parkings, setParkings] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&facet=Places_restantes");
      res
        .json()
        .then(res => setParkings(res.records))
        .catch(err => setErrors(err));
    }

    fetchData();
  });

  return (
    <div>
      <span>{JSON.stringify(parkings)}</span>
      <hr />
      <span>Has error: {JSON.stringify(hasError)}</span>
    </div>
  );
};
export default useOpenData;