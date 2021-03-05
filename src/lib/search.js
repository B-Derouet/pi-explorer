import isNaN from 'lodash/isNaN'
import isString from 'lodash/isString'
import toNumber from 'lodash/toNumber'
import {sdk} from './stellar'

import {
  isPublicKey,
  isSecretKey,
  isStellarAddress,
  isTxHash,
} from './stellar/utils'

const searchStringToPath = searchString => {
  if (!isString(searchString) || searchString.trim() === '') {
return null
}

  const string = searchString.trim()

  if (isPublicKey(string) || isStellarAddress(string)) {
    return `/account/${string}`
  } else if (isTxHash(string)) {
    return `/tx/${string}`
  } else if (!isNaN(toNumber(string))) {
    return `/ledger/${toNumber(string)}`
  } else if (isSecretKey(string)) {
    const kp = sdk.Keypair.fromSecret(string)
    return `/account/${kp.publicKey()}`
  }

  return `/error/not-found/${searchString}`
}

export {searchStringToPath as searchStrToPath}
