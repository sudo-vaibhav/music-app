import FeatherIcon from 'feather-icons-react'
import { Link } from 'react-router-dom'
import useSongsList from '../../helpers/useSongsList'

const Search = () => {
  const songs = useSongsList()

  return (
    <>
      <div
        style={{
          position: 'absolute',
          right: '0',
          // padding: '1rem',
          width: 'calc(100vw - 56px)',
          display: 'inline',
          display: 'flex',
        }}
      >
        <input
          style={{
            borderRadius: '25px',
            background: '#444',
            border: 'none',
            flex: '1',
          }}
        />
        <FeatherIcon icon="search" style={{ padding: '1rem' }} />
      </div>
      <div className="container" style={{ paddingTop: '4rem' }}>
        <h6 className="text-muted mb-4">Most Relevant Results</h6>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {songs.slice(0, 4).map((song) => {
            return (
              <div key={song._id}>
                <Link to={'/music'}>
                  <img
                    src={song.img_url}
                    style={{ width: '20vw' }}
                    alt={song.name}
                  />
                </Link>
              </div>
            )
          })}
        </div>
        <hr />
        <h6 className="text-muted mt-4">All results</h6>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {songs.map((song) => {
            return (
              <Link key={song._id} to={`/play/${song._id}`}>
                <li
                  className="my-4"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h6>{song.name}</h6>
                  <FeatherIcon icon="external-link" />
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Search
