import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Panel from 'react-bootstrap/lib/Panel'
import Row from 'react-bootstrap/lib/Row'
import {injectIntl} from 'react-intl'
import {setTitle} from '../lib/utils'
import OperationTable from './OperationTable'

class Operations extends React.Component {
  render() {
    setTitle('Operations')
    const {formatMessage} = this.props.intl
    return (
      <Grid>
        <Row>
          <Panel header={formatMessage({id: 'operations'})}>
            <OperationTable compact={false} limit={50} usePaging />
          </Panel>
        </Row>
      </Grid>
    )
  }
}

export default injectIntl(Operations)
