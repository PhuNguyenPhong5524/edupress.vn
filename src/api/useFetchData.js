import axios from "axios"
import { useEffect, useState } from "react"

const useFetchData = (nameResource) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        setLoading(true)

        const res = await axios.get(
          `https://mindx-mockup-server.vercel.app/api/resources/${nameResource}?apiKey=6957348a9dda81df11d0c527`
        )

        if (mounted) {
          setData(res?.data?.data?.data ?? [])
        }
      } catch (err) {
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [nameResource])

  return { data, loading, error }
}

export default useFetchData
