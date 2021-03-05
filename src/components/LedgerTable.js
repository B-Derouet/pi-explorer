import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'
import {withSpinner} from './shared/Spinner'
import TimeSynchronisedFormattedRelative from './shared/TimeSynchronizedFormattedRelative'

const LedgerRow = properties => (
  <tr>
    <td>
      <Link to={`/ledger/${properties.sequence}`}>{properties.sequence}</Link>
    </td>
    <td>
      {properties.txCountSuccessful > 0 ? (
        <Link to={`/ledger/${properties.sequence}#txs-table`}>{properties.txCountSuccessful}</Link>
      ) : (
        properties.txCountSuccessful
      )}
      {properties.compact === false && (<span>{' '}{properties.intl.formatMessage({id: 'operation.successful'})}</span>)}
       {' '}/ {properties.txCountFailed}
       {properties.compact === false && (<span>{' '}{properties.intl.formatMessage({id: 'operation.failed'})}</span>)}
    </td>
    <td>
      <span title={properties.time}>
        <TimeSynchronisedFormattedRelative
          initialNow={properties.parentRenderTimestamp}
          value={properties.time}
        />
      </span>
    </td>
  </tr>
)

LedgerRow.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  sequence: PropTypes.number,
  txCountSuccessful: PropTypes.number,
  txCountFailed: PropTypes.number,
  time: PropTypes.string,
}

class LedgerTable extends React.PureComponent {
  render() {
    return (
      <Table
        id="ledger-table"
        className="table-striped table-hover table-condensed"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="transactions" />
            </th>
            <th>
              <FormattedMessage id="time" />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map(ledger => (
            <LedgerRow
              compact={this.props.compact}
              key={ledger.sequence}
              sequence={ledger.sequence}
              parentRenderTimestamp={this.props.parentRenderTimestamp}
              time={ledger.time}
              txCountSuccessful={ledger.txCountSuccessful}
              txCountFailed={ledger.txCountFailed}
              intl={this.props.intl}
            />
          ))}
        </tbody>
      </Table>
    )
  }
}

LedgerTable.propTypes = {
  compact: PropTypes.bool,
  parentRenderTimestamp: PropTypes.number,
  records: PropTypes.array,
}

export default withSpinner()(LedgerTable)
