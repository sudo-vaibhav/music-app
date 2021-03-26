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
          const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            // waveColor: colors.primary,
            waveColor: 'transparent',
            progressColor: 'white',
            cursorColor: 'white',
            barWidth: 3,
            barRadius: 3,
            responsive: true,
            height: 150,
            // If true, normalize by the maximum peak instead of 1.0.
            normalize: true,
            // Use the PeakCache to improve rendering speed of large waveforms.
            partialRender: true,
          })
          console.log(song.song_url)
          wavesurfer.load(song.song_url)
          wavesurfer.on('ready', function () {
            // https://wavesurfer-js.org/docs/methods.html
            wavesurfer.play()
            // setPlay(true);

            // make sure object stillavailable when file loaded
            // if (wavesurfer.current) {
            //   wavesurfer.current.setVolume(volume)
            //   setVolume(volume)
            // }
          })
        }

        setData({
          song,
          color: vibrantColor,
          playing: true,
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
        <div className="container" ref={waveformRef}></div>
        <div onClick={handlePlayPause}>
          {playing ? <FeatherIcon icon="pause" /> : <FeatherIcon icon="play" />}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
