import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JSONButton from '../JSONButton'

configure({adapter: new Adapter()})

it('renders button with given url', () => {
  const url = 'https://somebackend.xyz/resource/12345'

  const button = shallow(<JSONButton url={url} />)
  expect(button.props().url).toEqual(url)

  expect(button.getElements()).toMatchSnapshot()
})
