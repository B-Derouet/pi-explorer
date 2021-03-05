import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {StrKey} from 'stellar-sdk'
import snakeCase from 'lodash/snakeCase'
import AccountLink from '../shared/AccountLink'
import {isPublicKey} from '../../lib/stellar/utils'
import {shortHash} from '../../lib/utils'

const propTypes = {
  homeDomain: PropTypes.string,
  signerKey: PropTypes.string,
  signerWeight: PropTypes.number,
  masterKeyWeight: PropTypes.number,
  inflationDest: PropTypes.string,
  setFlagsS: PropTypes.array,
  clearFlagsS: PropTypes.array,
  lowThreshold: PropTypes.number,
  medThreshold: PropTypes.number,
  highThreshold: PropTypes.number,
}

const dotCase = string => snakeCase(string).replace('_', '.')

const Option = ({msgId, value}) => {
  return (
    <FormattedMessage
      id={`operation.options.set.${msgId}`}
      values={{
        value,
      }}
    />
  )
}

const OptionValue = ({optKey, value}) => {
  let valueElement = value
  if (Array.isArray(value)) {
valueElement = value.join(', ')
} else if (
    (optKey === 'signerKey' && isPublicKey(value)) ||
    optKey === 'inflationDest'
  ) {
    valueElement = <AccountLink account={value} />
  } else if (optKey === 'signerKey') {
    // and !isPublicKey (#19)
    const decodedValue =
      value.charAt(0) === 'X'
        ? StrKey.decodeSha256Hash(value).toString('hex')
        : StrKey.decodePreAuthTx(value).toString('hex')
    valueElement = <span title={decodedValue}>{shortHash(decodedValue)}</span>
  } else if (optKey === 'homeDomain') {
    valueElement = <a href={`http://${value}`}>{value}</a>
  }
  return <span>{valueElement}</span>
}

const OptionsList = properties => (
  <span>
    {Object.keys(properties)
      .filter(p => p in propTypes)
      .map((property, index, all) => (
        <span key={property}>
          <Option
            msgId={dotCase(property)}
            value={<OptionValue optKey={property} value={properties[property]} />}
          />
          {index < all.length - 1 && ', '}
        </span>
      ))}
  </span>
)

const SetOptions = properties => (
  <FormattedMessage
    id="operation.options.set"
    values={{
      options: <OptionsList {...properties} />,
    }}
  />
)

SetOptions.propTypes = propTypes

export default SetOptions
