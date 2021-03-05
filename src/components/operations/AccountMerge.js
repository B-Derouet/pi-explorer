import React from 'react'
import {FormattedMessage} from 'react-intl'
import AccountLink from '../shared/AccountLink'

const AccountMerge = ({into}) =>
  <FormattedMessage
    id="operation.account.merge"
    values={{
      account: <AccountLink account={into} />,
    }}
  />

export default AccountMerge
