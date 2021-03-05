import {saveAs} from './filesaver'

// build and return csv string from array of column values
const toCsvString = stringArray =>
  stringArray.reduce(
    (accumulated, value, index) =>
      (accumulated += `"${
        typeof value === 'object' ? JSON.stringify(value).replace(/"/g, '""') : value
      }"${index < stringArray.length - 1 ? ',' : ''}`),
    '',
  )

const jsonToCSV = records => {
  const columns = []
  // get list of all columns across all records (as some record lists contain mixed structures)
  for (const rec of records) {
    const newKeys = Object.keys(rec).filter(
      key => !columns.includes(key) && typeof rec[key] !== 'function',
    )
    if (newKeys.length > 0) {
      columns.push(...newKeys)
    }
  }

  // map col name to col idx
  const colToIndex = columns.reduce((accumulated, currentCol, currentIndex) => {
    accumulated[currentCol] = currentIndex
    return accumulated
  }, {})

  const numberCols = columns.length
  const headerCsv = toCsvString(columns)

  return records.reduce((csvString, currentRec) => {
    const row = Array.from({length: numberCols})
    row.fill('')

    for (const key of Object.keys(currentRec)) {
(row[colToIndex[key]] = currentRec[key])
}
    csvString = `${csvString}\n${toCsvString(row)}`

    return csvString
  }, headerCsv)
}

const exportCSV = records => {
  const csvData = jsonToCSV(records)
  const autoByteOrderMark = true
  saveAs(
    new Blob(['\uFEFF', csvData], {type: 'text/csv;charset=utf-8'}),
    'stellar-export.csv',
    autoByteOrderMark,
  )
}

export {exportCSV, jsonToCSV}
