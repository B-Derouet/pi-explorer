import React from 'react'
import {FormattedMessage} from 'react-intl'
import AccountLink from '../shared/AccountLink'
import Trust from './Trust'

const AllowTrust = properties => (
  <Trust {...properties}>
    <FormattedMessage
      id="operation.trust.allow"
      values={{
        authorize: String(properties.authorize),
        trustor: <AccountLink account={properties.trustor} />,
      }}
    />
  </Trust>
)

export default AllowTrust
