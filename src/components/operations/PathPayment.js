import React from 'react'
import {FormattedMessage} from 'react-intl'
import Asset from '../shared/Asset'
import Payment from './Payment'

const PathPayment = properties => {
  const sourceAsset = (
    <Asset
      code={properties.sourceAssetCode}
      issuer={properties.sourceAssetIssuer}
      type={properties.sourceAssetType}
    />
  )
  return (
    <Payment {...properties}>
      <FormattedMessage
        id="operation.payment.path"
        values={{
          amount: properties.sourceAmount,
          asset: sourceAsset,
        }}
      />
    </Payment>
  )
}

export default PathPayment
