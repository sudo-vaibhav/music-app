import albumArt from './albumArt.png'
import './MusicPlayer.scss'
import playButton from './play-button.svg'
// https://iste-musicapp.azurewebsites.net/api

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <img src={albumArt} alt="" className="music-player__album-art" />
      <div className="music-player__player-area">
        <h1>I Feel It Coming</h1>
        <h4>The Weeknd</h4>

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
