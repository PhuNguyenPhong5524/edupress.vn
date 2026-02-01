import axios from "axios"
import { useEffect, useState } from "react"

const useFetchData = (nameResource) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(0)

  const refetch = () => setReload(prev => prev + 1)

  useEffect(() => {
    if (!nameResource) return

    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await axios.get(
          `https://mindx-mockup-server.vercel.app/api/resources/${nameResource}?apiKey=6957348a9dda81df11d0c527`,
          { signal: controller.signal }
        )

        setData(res?.data?.data?.data ?? [])
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err)
          setData([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [nameResource, reload]) // 👈 quan trọng

  return { data, loading, error, refetch }
}


export default useFetchData;