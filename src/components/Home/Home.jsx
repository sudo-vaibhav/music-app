import FeatherIcon from 'feather-icons-react'
import { Link } from 'react-router-dom'
import useSongsList from '../../helpers/useSongsList'
const Home = () => {
  const songs = useSongsList()

  return (
    <div>
      <Link
        to="/search"
        style={{
          padding: '1rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <FeatherIcon icon="search" />
      </Link>
      <div className="container mt-5 mx-0 row justify-content-between">
        {songs.map((song) => {
          return (
            <Link
              to={`/play/${song._id}`}
              className="col-5 my-4"
              key={song._id}
            >
              <img src={song.img_url} className="w-100" alt={song.name} />
              <h6 className="mt-2 mb-0">{song.name}</h6>
              <small className="text-muted">{song.artist}</small>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home