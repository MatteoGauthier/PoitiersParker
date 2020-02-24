import React, { useEffect } from "react"
import useSWR from "swr"
import fetch from './libs/fetch'

export default function App() {
  const url =
    "https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&facet=Places_restantes"
  const { data, error } = useSWR(url, fetch)
  // useEffect(() => console.log(data), [])
  return (
    <div className="App">

      {JSON.stringify(data.records)}
    </div>
  )
}

      {
        /* {data.map(({ datasetid, fields }) => (
        <li key={`photo-${datasetid}`}>
          {fields}
        </li>
      ))} */
      }
