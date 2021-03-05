import {join} from 'path'
import {tmpdir} from 'os'
import BigNumber from 'bignumber.js'
import truncate from 'lodash/truncate'

// Amounts in Stellar don't go below 7 decimals
// So setting the EXPONENTIAL_AT to 8 here ensures all toString() will show the
// numbers in full form. eg. 0.0000001 (not 1e7) which is what we want for
// formatAmount().
BigNumber.config({EXPONENTIAL_AT: 20})

const shortHash = (hash, length = 10) => truncate(hash, {length})

const isDefInt = (object, key) => {
  if (!object || !key || object.hasOwnProperty(key) === false) {
return false
}
  return Number.isInteger(Number(object[key]))
}

const base64Decode = value => Buffer.from(value, 'base64').toString()
const base64DecodeToHex = value => Buffer.from(value, 'base64').toString('hex')

// Extract asset issuer address from keys in the form <code>-<issuer>
const assetKeyToIssuer = key => key.slice(Math.max(0, key.indexOf('-') + 1))

const handleFetchDataFailure = id => e => {
  let status
  if (e.data && e.data.status) {
status = e.data.status
} else if (e.response && e.response.status) {
status = e.response.status
}

  let message = 'Failed to fetch data:'
  if (status) {
message += `\n\tStatus: [${status}]`
}
  if (e.response && e.response.status) {
message += `\n\tStatus: [${e.response.status}]`
}
  if (e.message) {
message += `\n\tMessage: [${e.message}]`
}
  if (e.stack) {
message += `\n\tStack: [${e.stack}]`
}

  console.error(message)
  console.error(`Raw Error: ${e}`)

  let errorURI
  if (status === 404) {
    let redirectURI = '/error/not-found'
    if (id) {
redirectURI += `/${id}`
}
    errorURI = redirectURI
  } else if (e.message === 'Network Error') {
    errorURI = '/error/general/network'
  } else {
    errorURI = `/error/general/${id}`
  }
  window.location.href = errorURI
}

const storageInit = () => {
  let storage
  if (typeof localStorage === 'undefined' || localStorage === null) {
    const storagePath = join(tmpdir(), 'piexp')
    const LocalStorage = require('node-localstorage').LocalStorage
    storage = new LocalStorage(storagePath)
  } else {
    storage = localStorage
  }
  return storage
}

const formatAmount = amount => {
  return new BigNumber(amount).toString()
}

const setTitle = subTitle => (document.title = `Pi Explorer | ${subTitle}`)

export {
  assetKeyToIssuer,
  base64Decode,
  base64DecodeToHex,
  formatAmount,
  handleFetchDataFailure,
  isDefInt,
  setTitle,
  shortHash,
  storageInit,
}
