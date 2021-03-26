import { useEffect, useState } from 'react'
import axios from 'axios'

const useSongsList = (query = '') => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    const fetchSongs = async () => {
      const data = await axios
        .get(`https://iste-musicapp.azurewebsites.net/api/search?q=${query}`)
        .then((resp) => resp.data)

      setSongs(data)
    }

    fetchSongs()
  }, [query])

  return songs
}

export default useSongsList
