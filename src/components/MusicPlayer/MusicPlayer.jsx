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

  const [{ playing, song, color, loading }, setData] = useState({
    song: {
      _id: '',
      name: '',
      artist: '',
      img_url: '',
      song_url: '',
    },
    color: 'black',
    playing: false,
    loading: true,
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
      console.log('asdfas')
      const song = await axios
        .get(`https://iste-musicapp.azurewebsites.net/api/songs/${songId}`)
        .then((resp) => resp.data)

      let vibrantColor
      Vibrant.from(song.img_url).getPalette((err, palette) => {
        vibrantColor = palette.Vibrant.hex
        console.log('got vibrant color')
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
            // partialRender: true,
          })
          console.log('here')
          wavesurfer.current.load(song.song_url)
          wavesurfer.current.on('ready', function () {
            wavesurfer.current.play()
            setData({
              song,
              color: vibrantColor,
              playing: true,
              loading: false,
            })
          })

          wavesurfer.current.on('finish', () => {
            setData({
              playing: false,
              song,
              color,
              loading,
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
  console.log(song.img_url)
  return (
    // !loading ?
    <div className="music-player">
      <div
        style={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${song.img_url})`,
        }}
        className="music-player__album-art"
      ></div>
      {/* <img src={song.img_url} alt=""  /> */}
      <div
        style={{
          backgroundColor: color,
        }}
        className="music-player__player-area"
      >
        <h1>{song.name}</h1>
        <small>{song.artist}</small>
        <div
          className="container w-75 my-4"
          style={{
            position: 'relative',
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
            <FeatherIcon icon="pause" size={36} />
          ) : (
            <FeatherIcon icon="play" size={36} />
          )}
        </div>
      </div>
    </div>
    // : (
    //   <div
    //     style={{
    //       position: 'fixed',
    //       height: '100vh',
    //       width: '100vw',
    //       display: 'grid',
    //       placeItems: 'center',
    //       pointerEvents: 'none',
    //     }}
    //   >
    //     <div className="spinner-border text-light" role="status"></div>
    //     <div ref={waveformRef}></div>
    //   </div>
    //     )
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
    /*: (*/
   /*: (*/)
}

export default MusicPlayer
