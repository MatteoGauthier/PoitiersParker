import useSWR from "swr"
import fetch from "./fetch"

export default function useOpenData() {
  const url =
    "https://data.grandpoitiers.fr/api/records/1.0/search/?dataset=mobilites-stationnement-des-parkings-en-temps-reel&facet=Places_restantes"
  const { data, error } = useSWR(url, fetch)
  // useEffect(() => console.log(data), [])
  if (error) return "failed to load"
  if (!data) return "loading..."

  return data.records
}
