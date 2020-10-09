import { Dialog } from '@material-ui/core';
import Layout from 'components/Layout';
import { mount } from 'enzyme';
import Profile from 'pages/profile/Profile.js';
import React from 'react';
import Root from 'Root';

let wrapped;
beforeEach(() => {
    wrapped = mount(<Root><Profile open onClose={() => null} /></Root>);
});

it('should render without crashing and modal is open', () => {
    expect(wrapped.find(Dialog).length).toEqual(1);

    expect(wrapped.find(Profile).props().open).toEqual(true);

});
