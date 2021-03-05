import { StrKey } from "stellar-sdk"

// stellar federated address (eg. "stellar*fed.network")
const isStellarAddress = addr => /^[^*,]*\*[\d.a-z-]*$/i.test(addr)
const isPublicKey = keyString => StrKey.isValidEd25519PublicKey(keyString)
const isSecretKey = keyString => StrKey.isValidEd25519SecretSeed(keyString)
const isTxHash = hashString => /^[\da-f]{64}$/i.test(hashString)

export {isPublicKey, isSecretKey, isStellarAddress, isTxHash}
