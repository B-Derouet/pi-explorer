import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import {injectIntl} from 'react-intl'
import {setTitle} from '../lib/utils'
import LedgerTable from './LedgerTableContainer'

class Ledgers extends React.Component {
  render() {
    setTitle('Ledgers')
    const {formatMessage} = this.props.intl
    return (
      <Grid>
        <Row>
          <Panel header={formatMessage({id: 'ledgers'})}>
            <LedgerTable usePaging compact={false} limit={20} intl={this.props.intl}/>
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default injectIntl(Ledgers)
