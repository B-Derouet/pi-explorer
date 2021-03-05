import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const AccountLink = ({account, label, hideKnown = false}) => {
  if (!account || account === undefined) {
return null
}
  let accumulatorLabel = label
  if (!accumulatorLabel) {
    accumulatorLabel = account.slice(0, 4)
  }
  return (
    <span title={account}>
      <Link to={`/account/${account}`}>{accumulatorLabel}</Link>
    </span>
  )
}

AccountLink.propTypes = {
  account: PropTypes.string.isRequired,
  hideKnown: PropTypes.bool,
  label: PropTypes.string,
}

export default AccountLink
