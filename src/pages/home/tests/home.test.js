import Layout from 'components/Layout';
import { shallow, mount } from 'enzyme';
import Home from 'pages/home/Home.js';
import React from 'react';
import Root from 'Root';

let wrapped;
beforeEach(() => {
    wrapped = mount(<Root><Home /></Root>);
});

it('should render without crashing', () => {
    expect(wrapped.find(Layout).length).toEqual(1);
});
