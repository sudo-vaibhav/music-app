import React from 'react'
import { useHistory } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

const HOC = ({ children }) => {
  const history = useHistory()
  const handleClick = () => {
    history.goBack()
  }
  return (
    <>
      <div
        // className="container"
        style={{
          position: 'fixed',
          padding: '1rem',
        }}
      >
        <FeatherIcon
          icon="chevron-left"
          onClick={handleClick}
          // style={{ height: '2rem' }}
        />
      </div>

      {children}
    </>
  )
}

export default HOC
