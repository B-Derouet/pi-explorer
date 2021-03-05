import React from 'react'
import {compose} from 'recompose'
import {isPublicKey} from '../lib/stellar/utils'
import {isDefInt} from '../lib/utils'
import {withPaging} from './shared/Paging'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import {withDataFetchingAllContainer} from './shared/DataFetchingAllContainer'
import TransactionTable from './TransactionTable'
import CSVExport from './shared/CSVExport'

const rspRecToPropertiesRec = rspRec => {
  return {
    hash: rspRec.hash,
    ledger: rspRec.ledger_attr,
    opCount: rspRec.operation_count,
    sourceAccount: rspRec.source_account,
    time: rspRec.created_at,
  }
}

const fetchRecords = properties => {
  const builder = properties.server.transactions()
  if (isDefInt(properties, 'ledger')) {
builder.forLedger(properties.ledger)
}
  if (isPublicKey(properties.account)) {
builder.forAccount(properties.account)
}
  builder.limit(properties.limit)
  builder.order('desc')
  return builder.call()
}

const callBuilder = properties => properties.server.transactions()

const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropertiesRec, callBuilder),
)

const ExportToCSVComponent = withDataFetchingAllContainer(fetchRecords)(
  CSVExport,
)

const wrapHOC = Component => properties => (
  <div>
    <div>
      <Component {...properties} />
    </div>
    {!properties.noCSVExport && (
      <div className="text-center" id="csv-export">
        <ExportToCSVComponent {...properties} />
      </div>
    )}
  </div>
)

export default enhance(wrapHOC(TransactionTable))
