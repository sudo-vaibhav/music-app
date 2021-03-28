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
        style={{
          position: 'fixed',
          padding: '1rem',
          zIndex: '100',
        }}
      >
        <FeatherIcon icon="chevron-left" onClick={handleClick} />
      </div>

      {children}
    </>
  )
}

export default HOC
