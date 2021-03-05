import React from 'react'

import Col from 'react-bootstrap/lib/Col'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import FormControl from 'react-bootstrap/lib/FormControl'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import Modal from 'react-bootstrap/lib/Modal'

import {withRouter} from 'react-router'
import {injectIntl} from 'react-intl'

import {searchStrToPath as searchStringToPath} from '../../lib/search'
import {isSecretKey} from '../../lib/stellar/utils'

const HelpModal = properties => {
  const {formatMessage} = properties.intl

  return (
    <Modal id="help-modal" show={properties.show} onHide={properties.handleCloseFn}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg" style={{color: '#dce2ec'}}>
          {formatMessage({id: 'search.help'})}
          </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{color: '#96a2b4'}}>
        <h4>{formatMessage({id: 'search.by'})}</h4>
        <br />
        <div>
          <h5>{formatMessage({id: 'search.stellar.address'})}</h5>
          {formatMessage({id: 'search.stellar.other.name'})}{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.stellar.org/developers/guides/concepts/federation.html#stellar-addresses"
          >
            {formatMessage({id: 'search.stellar.federated.address'})}
          </a>
          <img
            src={`${process.env.PUBLIC_URL}/search/search_stellar_address.png`}
            alt={formatMessage({id: 'search.by.stellar.federated.address'})}
          />
        </div>
        <div>
          <h5>{formatMessage({id: 'search.accoundID'})}</h5>
          {formatMessage({id: 'search.accoundID.explanation'})}
          <img
            src={`${process.env.PUBLIC_URL}/search/search_account_public.png`}
            alt={formatMessage({id: 'search.by.account.address'})}
            width="100%"
          />
        </div>
        <div>
          <h5>{formatMessage({id: 'search.transaction.hash'})}</h5>
          <img
            src={`${process.env.PUBLIC_URL}/search/search_tx_hash.png`}
            alt={formatMessage({id: 'search.by.transaction.hash'})}
            width="100%"
          />
        </div>
        <div>
          <h5>{formatMessage({id: 'search.ledger'})}</h5>
          <img
            src={`${process.env.PUBLIC_URL}/search/search_ledger.png`}
            alt={formatMessage({id: 'search.by.ledger'})}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

class SearchBox extends React.Component {
  state = {
    searchStr: '',
    showHelp: false,
  }

  constructor(properties, context) {
    super(properties, context)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({show: false})
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({show: true})
  }

  searchHandler = event => {
    event.preventDefault()
    const matchPath = searchStringToPath(this.state.searchStr)
    this.props.history.push(matchPath)
    // #62 security: clear search box if user put the secret key there
    if (isSecretKey(this.state.searchStr)) {
      this.setState({searchStr: ''})
    }
  }

  render() {
    const {formatMessage} = this.props.intl
    return (
      <Grid>
      <Row>
        <Col id="Search-Container">
        <form onSubmit={this.searchHandler}>
          <InputGroup>
            <FormControl
              type="text"
              onChange={e => this.setState({searchStr: e.target.value})}
              placeholder={formatMessage({id: 'search.placeHolder'})}
              value={this.state.searchStr}
            />
            <InputGroup.Addon>
              <Glyphicon glyph="search" onClick={this.searchHandler} />
            </InputGroup.Addon>
            <InputGroup.Addon>
              <Glyphicon
                className="info-icon"
                glyph="info-sign"
                onClick={this.handleClick}
              />
            </InputGroup.Addon>
          </InputGroup>
        </form>
        {this.state.show && (
          <HelpModal handleCloseFn={this.handleClose} show={this.state.show} intl={this.props.intl} />
        )}
      </Col>
    </Row>
  </Grid>
    )
  }
}

export default injectIntl(withRouter(SearchBox))
