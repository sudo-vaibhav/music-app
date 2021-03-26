import './MusicPlayer.scss'
import playButton from './play-button.svg'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as Vibrant from 'node-vibrant'

const MusicPlayer = () => {
  const { songId } = useParams()

  const [{ song, color }, setData] = useState({
    song: {
      _id: '',
      name: '',
      artist: '',
      img_url: '',
      song_url: '',
    },
    color: 'black',
    // __v: 0,
  })

  useEffect(() => {
    ;(async () => {
      const song = await axios
        .get(`https://iste-musicapp.azurewebsites.net/api/songs/${songId}`)
        .then((resp) => resp.data)

      let vibrantColor
      Vibrant.from(song.img_url).getPalette((err, palette) => {
        // console.log(),
        vibrantColor = palette.Vibrant.hex
        setData({
          song,
          color: vibrantColor,
        })
      })
    })()
  }, [songId])

  return (
    <div className="music-player">
      <img src={song.img_url} alt="" className="music-player__album-art" />
      <div style={{ background: color }} className="music-player__player-area">
        <h1>{song.name}</h1>
        <h4>{song.artist}</h4>

        <div>
          <img
            src={playButton}
            className="music-player__player-area__play-button"
          />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
