import React from 'react'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {FormattedMessage, injectIntl} from 'react-intl'

import LanguageSelector from './LanguageSelector'

class Header extends React.Component {
  render() {
    return (
      <Navbar fluid fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <span className="brand-text">Pi Explorer</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <LanguageSelector
              language={this.props.language}
              switcher={this.props.languageSwitcher}
            />
          </Navbar.Form>
          <Nav>
            <li className="divider-vertical" />

            <LinkContainer to="/operations">
              <NavItem>
                <FormattedMessage id="operations" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/txs">
              <NavItem>
                <FormattedMessage id="transactions" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/ledgers">
              <NavItem>
                <FormattedMessage id="ledgers" />
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/effects">
                <MenuItem>
                  <FormattedMessage id="effects" />
                </MenuItem>
              </LinkContainer>
              <LinkContainer to="/payments">
                <MenuItem>
                  <FormattedMessage id="payments" />
                </MenuItem>
              </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default injectIntl(Header)
