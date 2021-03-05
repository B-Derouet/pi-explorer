import {searchStrToPath as searchStringToPath} from '../search'

const notFound = string => `/error/not-found/${string}`

describe('searchStrToPath', () => {
  it('returns null for empty input', () => {
    expect(searchStringToPath()).toBeNull()
    expect(searchStringToPath(null)).toBeNull()
    expect(searchStringToPath('')).toBeNull()
    expect(searchStringToPath('\t')).toBeNull()
    expect(searchStringToPath('  ')).toBeNull()
  })

  it('returns null for malformed input', () => {
    expect(searchStringToPath('5a2114b123f')).toEqual(notFound('5a2114b123f'))
    expect(searchStringToPath('GDCX3FBHR7A')).toEqual(notFound('GDCX3FBHR7A'))
    expect(searchStringToPath('not@federated.form')).toEqual(
      notFound('not@federated.form'),
    )
    expect(searchStringToPath('not.federated.form')).toEqual(
      notFound('not.federated.form'),
    )
  })

  it('returns /ledger for numbers', () => {
    expect(searchStringToPath('3')).toEqual('/ledger/3')
    expect(searchStringToPath('4567890')).toEqual('/ledger/4567890')
  })

  it('returns /tx for transaction hashes', () => {
    expect(
      searchStringToPath(
        '5a2114b123f7128c37f84004f5cf54b11c1ba38daeebc7295a2a1cd67ddd0482',
      ),
    ).toEqual(
      '/tx/5a2114b123f7128c37f84004f5cf54b11c1ba38daeebc7295a2a1cd67ddd0482',
    )
  })

  it('returns /account for public keys', () => {
    expect(
      searchStringToPath(
        'GDCX3FBHR7IKHSDFDCA4XY65NF6B2WMF5WR67FIXN5JXURJ3YDGSU2BS',
      ),
    ).toEqual(
      '/account/GDCX3FBHR7IKHSDFDCA4XY65NF6B2WMF5WR67FIXN5JXURJ3YDGSU2BS',
    )
  })

  it('returns /account for federated addresses', () => {
    expect(searchStringToPath('steexp*fed.network')).toEqual(
      '/account/steexp*fed.network',
    )
  })
})
