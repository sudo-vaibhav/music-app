import './MusicPlayer.scss'
import { useParams } from 'react-router'
import FeatherIcon from 'feather-icons-react'
import { useEffect, useState, useRef } from 'react'
import axios from '../../helpers/axiosForMusic'

import * as Vibrant from 'node-vibrant'
import WaveSurfer from 'wavesurfer.js'
import SmoothImage from 'react-smooth-image'

const MusicPlayer = () => {
  const { songId } = useParams()
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  const [{ playing, song, color }, setData] = useState({
    song: {
      _id: '',
      name: 'Loading',
      artist: 'Loading',
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
      const song = await axios.get(`/songs/${songId}`)

      let vibrantColor
      Vibrant.from(song.img_url).getPalette((err, palette) => {
        vibrantColor = palette.Vibrant.hex
        if (waveformRef.current) {
          wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'transparent',
            progressColor: 'white',
            cursorColor: 'white',
            barWidth: 6,
            barRadius: 10,
            responsive: true,
            height: 75,
            normalize: true,
          })
          wavesurfer.current.load(song.song_url)
          wavesurfer.current.on('ready', function () {
            wavesurfer.current.play()
            setData({
              song,
              color: vibrantColor,
              playing: true,
            })
          })

          wavesurfer.current.on('finish', () => {
            setData({
              playing: false,
              song,
              color,
            })
          })
        }
      })
    })()

    return () => {
      console.log('destroying wavesurfer instance')
      if (wavesurfer.current) wavesurfer.current.destroy()
    }
  }, [songId])
  return (
    <div className="music-player">
      <div className="music-player__album-art">
        <SmoothImage src={song.img_url} />
      </div>
      <div
        style={{
          backgroundColor: color,
        }}
        className="music-player__player-area"
      >
        <h1
          style={{
            fontWeight: 'bold',
          }}
        >
          {song.name}
        </h1>
        <small>{song.artist}</small>
        <div
          className="container-fluid px-0 w-75 my-4"
          style={{
            position: 'relative',
            height: 75,
          }}
        >
          <div ref={waveformRef}></div>
          <div
            style={{
              height: '2px',
              width: '100%',
              background: 'rgba(255,255,255,0.5)',
              position: 'absolute',
              top: '50%',
            }}
          ></div>
        </div>
        <div onClick={handlePlayPause}>
          {playing ? (
            <FeatherIcon fill="white" icon="pause" size={36} />
          ) : (
            <FeatherIcon fill="white" icon="play" size={36} />
          )}
        </div>
      </div>
    </div>
  )
}
export default MusicPlayer
