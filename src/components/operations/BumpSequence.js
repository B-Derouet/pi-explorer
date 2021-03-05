import React from 'react'
import {FormattedMessage} from 'react-intl'

const BumpSequence = properties => (
  <FormattedMessage
    id="operation.bump"
    values={{
      sequence: String(properties.bumpTo),
    }}
  />
)

export default BumpSequence
