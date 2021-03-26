import './MusicPlayer.scss'
import { useParams } from 'react-router'
import FeatherIcon from 'feather-icons-react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import * as Vibrant from 'node-vibrant'
import WaveSurfer from 'wavesurfer.js'

const MusicPlayer = () => {
  const { songId } = useParams()
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  const [{ playing, song, color }, setData] = useState({
    song: {
      _id: '',
      name: '',
      artist: '',
      img_url: '',
      song_url: '',
    },
    color: 'black',
    playing: false,
  })

  const handlePlayPause = () => {
    setData({
      ...{ color, song },
      playing: !playing,
    })
    wavesurfer.current.playPause()
  }
  useEffect(() => {
    ;(async () => {
      const song = await axios
        .get(`https://iste-musicapp.azurewebsites.net/api/songs/${songId}`)
        .then((resp) => resp.data)

      let vibrantColor
      Vibrant.from(song.img_url).getPalette((err, palette) => {
        vibrantColor = palette.Vibrant.hex

        if (waveformRef.current) {
          wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            // waveColor: colors.primary,
            waveColor: 'transparent',
            progressColor: 'white',
            cursorColor: 'white',
            barWidth: 4,
            barRadius: 10,
            responsive: true,
            height: 75,
            // If true, normalize by the maximum peak instead of 1.0.
            normalize: true,
            // Use the PeakCache to improve rendering speed of large waveforms.
            partialRender: true,
          })
          console.log(song.song_url)
          wavesurfer.current.load(song.song_url)
          wavesurfer.current.on('ready', function () {
            // https://wavesurfer-js.org/docs/methods.html
            wavesurfer.current.play()

            setData({
              song,
              color: vibrantColor,
              playing: true,
            })
          })
        }
      })
    })()
  }, [songId])

  return (
    <div className="music-player">
      <img src={song.img_url} alt="" className="music-player__album-art" />
      <div style={{ background: color }} className="music-player__player-area">
        <h1>{song.name}</h1>
        <h4>{song.artist}</h4>
        <div className="container w-75" ref={waveformRef}></div>
        <div onClick={handlePlayPause}>
          {playing ? (
            <FeatherIcon icon="pause" size={36} />
          ) : (
            <FeatherIcon icon="play" size={36} />
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
