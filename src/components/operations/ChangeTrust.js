import React from 'react'
import {FormattedMessage} from 'react-intl'
import Trust from './Trust'

const ChangeTrust = properties =>
  <Trust {...properties}>
    <FormattedMessage
      id="operation.trust.change"
      values={{
        limit: properties.limit,
      }}
    />
  </Trust>

export default ChangeTrust
