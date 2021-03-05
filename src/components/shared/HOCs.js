import React from 'react'
import {getContext} from 'recompose'
import PropTypes from 'prop-types'

const withEither = (
  conditionalRenderingFunction,
  EitherComponent,
) => Component => properties =>
  conditionalRenderingFunction(properties)
    ? <EitherComponent {...properties} />
    : <Component {...properties} />

// @see App.js which puts this stellar server handle on the context
const withServer = getContext({server: PropTypes.object})

export {withEither, withServer}
