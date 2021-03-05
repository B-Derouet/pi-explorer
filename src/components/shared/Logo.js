import React from 'react'
import PropTypes from 'prop-types'

// 2 supported logo forms
const squareDimensions = {height: 75, width: 75}
const rectangleDimensions = {height: 40, width: 150}

// exchange image from anchor image
const imagesInBoth = new Set(['papayabot', 'papayaswap', 'ripplefox'])

const Logo = ({name, type = 'anchor'}) => {
  const nameLower = name.toLowerCase()
  const imgSource = `${process.env.PUBLIC_URL}/img/${nameLower}.png`
  const dimen =
    type !== 'exchange' || imagesInBoth.has(nameLower)
      ? squareDimensions
      : rectangleDimensions
  return (
    <span>
      <img
        src={imgSource}
        alt={name}
        title={name}
        height={dimen.height}
        width={dimen.width}
      />
    </span>
  )
}

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Logo
