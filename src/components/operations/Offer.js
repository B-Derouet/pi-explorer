import React from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'

import AccountLink from '../shared/AccountLink'
import Asset from '../shared/Asset'
import FormattedAmount from '../shared/FormattedAmount'

const BuyingAsset = ({buyingAssetCode, buyingAssetIssuer, buyingAssetType}) => (
  <Asset
    code={buyingAssetCode}
    issuer={buyingAssetIssuer}
    type={buyingAssetType}
  />
)

const SellingAsset = ({
  sellingAssetCode,
  sellingAssetIssuer,
  sellingAssetType,
}) => (
  <Asset
    code={sellingAssetCode}
    issuer={sellingAssetIssuer}
    type={sellingAssetType}
  />
)

const offerType = (amount, offerId) => {
  let type = ''
  if (offerId === 0) {
type = 'sell'
} else if (Number.parseFloat(amount) === 0) {
type = 'remove'
} else {
type = 'update'
}
  return type
}

const Offer = properties => {
  const {amount, offerId, price} = properties
  const messageId = `operation.offer.${offerType(amount, offerId)}`
  return (
    <FormattedMessage
      id={messageId}
      values={{
        amount: <FormattedAmount amount={amount} />,
        buyingAsset: <BuyingAsset {...properties} />,
        price: <FormattedAmount amount={price} />,
        sellingAsset: <SellingAsset {...properties} />,
      }}
    />
  )
}

const OfferRow = properties => (
  <tr key={properties.id} className="trade">
    {properties.showSeller === true && (
      <td className="account-badge">
        <AccountLink account={properties.seller} />
      </td>
    )}
    <td>
      <SellingAsset {...properties} />
    </td>
    <td>
      <BuyingAsset {...properties} />
    </td>
    <td>{properties.amount}</td>
    <td>{properties.price}</td>
  </tr>
)

Offer.propTypes = {
  amount: PropTypes.string,
  buyingAssetCode: PropTypes.string,
  buyingAssetIssuer: PropTypes.string,
  buyingAssetType: PropTypes.string.isRequired,
  offerId: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  seller: PropTypes.string,
  sellingAssetCode: PropTypes.string,
  sellingAssetIssuer: PropTypes.string,
  sellingAssetType: PropTypes.string.isRequired,
  showSeller: PropTypes.bool,
}

export {Offer as default, OfferRow}
