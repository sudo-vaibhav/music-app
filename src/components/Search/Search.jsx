import FeatherIcon from 'feather-icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSongsList from '../../helpers/useSongsList'
import SmoothImage from 'react-smooth-image'

const Search = () => {
  const [query, setQuery] = useState('')
  const songs = useSongsList(query)

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div
        style={{
          padding: '1rem 1rem 1rem 0',
          display: 'flex',
          position: 'fixed',
          right: 0,
          justifyContent: 'flex-end',
          width: 'calc(100vw - 56px)',
        }}
      >
        <input
          placeholder="Search by song name"
          style={{
            borderRadius: '25px',
            background: '#444',
            border: 'none',
            padding: '0.5rem 1rem',
            color: 'white',
            flex: 1,
          }}
          value={query}
          onChange={handleChange}
        />
        <FeatherIcon icon="search" style={{ marginLeft: '1rem' }} />
      </div>
      <div className="container" style={{ paddingTop: '5rem' }}>
        {songs.length !== 0 ? (
          <>
            <h6 className="text-muted mb-4">Most Relevant Results</h6>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {songs.slice(0, 4).map((song) => {
                return (
                  <div key={song._id}>
                    <Link to={`/play/${song._id}`}>
                      <div style={{ width: '20vw', margin: '0 1.25vw' }}>
                        <SmoothImage src={song.img_url} />
                      </div>
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
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <h6>{song.name}</h6>
                      <FeatherIcon icon="external-link" />
                    </li>
                  </Link>
                )
              })}
            </ul>
          </>
        ) : (
          <h6 className="text-muted">No results found</h6>
        )}
      </div>
    </>
  )
}

export default Search
