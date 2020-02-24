import React, { useEffect } from "react"
import useSWR from "swr"
import fetch from "./logic/fetch"
import Icon from "./assets/location-sharp-white.svg"
import ReactMap, { Layer, Marker, Feature } from "react-mapbox-gl"
import "minireset.css"

const accessToken = "pk.eyJ1IjoibWF0dGl4bm93IiwiYSI6ImNqaTh1bXp1eDBxNTczcnBwd3NxaHZodmgifQ.Sv-Objycwyho76zqwN5PbQ"
const Map = ReactMap({
  accessToken
})
const mapStyle = {
  height: "100vh",
  width: "100vw"
}
const image = new Image(52, 52)
image.src = Icon
const images = ["myImage", image]


export default function App() {
  const url =
    "https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&facet=Places_restantes"
  const { data, error } = useSWR(url, fetch)

  if (error) return <div>error</div>
  if (!data) return <div>loding</div>

  return (
    <div className="App">
      {/* {JSON.stringify(data.records[0])} */}
      {/* <ul>
        {data &&
          data.records.map(({ fields, recordid }) => (
            <li key={`${recordid}`}>
              {fields.nom} - {fields.places_restantes}
            </li>
          ))}
      </ul> */}
      <Map
        style="mapbox://styles/mattixnow/ck6z66k6z0opy1is878w8c3hr" // eslint-disable-line
        containerStyle={mapStyle}
        center={[0.342793, 46.58188]}
        zoom={[14]}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "location-sharp-white" }}
          images={images}
          layout={{
            "icon-image": "myImage",
            "icon-allow-overlap": true
          }}
        >
          {data &&
            data.records.map(({ fields, recordid, geometry}) => (
            <Feature key={`${recordid}`} coordinates={geometry.coordinates}/>
          ))}
        </Layer>
      </Map>
    </div>
  )
}
