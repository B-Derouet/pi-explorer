import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AccountLink from '../AccountLink'

configure({adapter: new Adapter()})

const ACC_UNKNOWN = 'GCGG3CIRBG2TTBR4HYZJ7JLDRFKZIYOAHFXRWLU62CA2QN52P2SUQNPJ'
const LABEL = 'Anchor'

it('renders with label', () => {
  const link = shallow(<AccountLink label={LABEL} account={ACC_UNKNOWN} />)
  expect(link.getElements()).toMatchSnapshot()
})

it('renders short account for label when no label property', () => {
  const link = shallow(<AccountLink account={ACC_UNKNOWN} />)
  expect(link.getElements()).toMatchSnapshot()
})
