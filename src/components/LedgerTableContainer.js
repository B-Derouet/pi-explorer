import {compose} from 'recompose'
import {withPaging} from './shared/Paging'
import {withDataFetchingContainer} from './shared/DataFetchingContainer'
import LedgerTable from './LedgerTable'

const rspRecToPropertiesRec = rspRec => {
  return {
    sequence: rspRec.sequence,
    time: rspRec.closed_at,
    txCountSuccessful: rspRec.successful_transaction_count,
    txCountFailed: rspRec.failed_transaction_count,
  }
}

const fetchRecords = properties => {
  const builder = properties.server.ledgers()
  builder.limit(properties.limit)
  builder.order('desc')
  return builder.call()
}

const callBuilder = properties => properties.server.ledgers()

const enhance = compose(
  withPaging(),
  withDataFetchingContainer(fetchRecords, rspRecToPropertiesRec, callBuilder),
)
export default enhance(LedgerTable)
