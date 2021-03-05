import React from 'react'
import {FormattedMessage} from 'react-intl'
import AccountLink from '../shared/AccountLink'

const Trust = ({assetCode, children, trustee}) =>
  <span>
    <FormattedMessage
      id="operation.trust"
      values={{
        assetCode,
        trustee: <AccountLink account={trustee} />,
      }}
    />
    {children}
  </span>

export default Trust
