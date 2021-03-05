import React, {Component} from 'react'
import ReactLoadable from 'react-loadable'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import PropTypes from 'prop-types'

import {IntlProvider, addLocaleData} from 'react-intl'
import fr from 'react-intl/locale-data/fr'
import en from 'react-intl/locale-data/en'
import frMessages from './languages/fr'
import enMessages from './languages/en'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import SearchBox from './components/layout/SearchBox'
import NoMatchError from './components/shared/NoMatchError'
import InsecureNetworkError from './components/shared/InsecureNetworkError'
import Error from './components/shared/Error'
import {Spinner} from './components/shared/Spinner'
import InfoBanner from './components/shared/InfoBanner'

import {Server} from './lib/stellar'
import {storageInit} from './lib/utils'
import {searchStrToPath as searchStringToPath} from './lib/search'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-json-pretty/src/JSONPretty.1337.css'
import './App.css'

const storage = storageInit()

addLocaleData([...fr, ...en])

const initialLanguage =
  storage.getItem('language') || navigator.language || 'fr'

// Derive network type from the hostname.
// Network settings determine which horizon instance to pull data from.
const networkAddress = 'https://api.testnet.minepi.com/'

const getMessages = locale => {
  return locale === 'en' ? enMessages : frMessages
}

/*
 * Dyanmically loaded components
 */

const Loadable = componentString =>
  ReactLoadable({
    loader: () => import(`./components/${componentString}`),
    loading() {
      return <Spinner />
    },
  })

const Account = Loadable('Account')
const Accounts = Loadable('Accounts')
const Effects = Loadable('Effects')
const Ledger = Loadable('Ledger')
const Ledgers = Loadable('Ledgers')
const Operations = Loadable('Operations')
const Payments = Loadable('Payments')
const Transaction = Loadable('Transaction')
const Transactions = Loadable('Transactions')

class App extends Component {
  state = {
    language: initialLanguage,
    networkAddress,
    server: Server(networkAddress, storage),
  }

  componentWillMount() {
    if (this.state.networkAddress !== networkAddress) {
      this.setNetworkAddress(networkAddress, window.location.href)
    }
  }

  setNetworkAddress = (networkAddress, href) => {
    console.log(
      `NETWORK change: ${this.state.networkAddress} to ${networkAddress}`,
    )
    storage.setItem('networkAddress', networkAddress)

    if (!href) {
      href = window.location.origin
    }
    window.location.href = href
  }

  languageSwitcher = event => {
    const newLanguage = event.target.lang
    storage.setItem('language', newLanguage)
    this.setState({language: newLanguage})
  }

  // @see HOCs.js withServer() to get this as props in any component
  getChildContext() {
    return {server: this.state.server}
  }

  render() {
    return (
      <IntlProvider
        key={this.state.language}
        locale={this.state.language}
        messages={getMessages(this.state.language)}
      >
        <Router>
          <div className="App">
            <Header
              networkAddress={this.state.networkAddress}
              networkType={this.state.networkType}
              setNetworkAddress={this.setNetworkAddress}
              language={this.state.language}
              languageSwitcher={this.languageSwitcher}
            />
            <SearchBox />
            <InfoBanner />
            <div id="main-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/accounts" component={Accounts} />
                <Route path="/account/:id" component={Account} />
                <Route path="/effects" component={Effects} />
                <Route path="/ledgers" component={Ledgers} />
                <Route path="/ledger/:id" component={Ledger} />
                <Route path="/operations" component={Operations} />
                <Route path="/payments" component={Payments} />
                <Route path="/txs" component={Transactions} />
                <Route path="/tx/:id" component={Transaction} />
                <Route
                  path="/search/:id"
                  render={({match}) => {
                    const searchString = match.params.id
                    return <Redirect to={searchStringToPath(searchString)} />
                  }}
                />
                <Route
                  path="/error/insecure-horizon-server"
                  component={InsecureNetworkError}
                />
                <Route path="/error/not-found/:id" component={NoMatchError} />
                <Route path="/error/general/:id" component={Error} />
                <Route component={Error} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    )
  }
}

App.childContextTypes = {
  server: PropTypes.object,
}

export default App
