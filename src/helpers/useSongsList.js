import { useEffect, useState } from 'react'
import axios from './axiosForMusic'

const useSongsList = (query = '') => {
  const [songs, setSongs] = useState([])
  useEffect(() => {
    const fetchSongs = async () => {
      const data = await axios.get(`/search?q=${query}`)
      setSongs(data)
    }

    fetchSongs()
  }, [query])

  return songs
}

export default useSongsList
