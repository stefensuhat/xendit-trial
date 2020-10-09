import { TableRow } from '@material-ui/core';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Home from 'pages/home/Home.js';
import React from 'react';
import data from 'assets/data.json';
import Root from 'Root';
import axios from 'axios';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://localhost:3000/businesses', {
        status: 200,
        response: data.businesses,
    });
});

afterEach(() => {
    moxios.uninstall();
});

// done will be manually set by developer
it('can fetch a list of comments and display them', (done) => {
    // Attempt to render the entire app
    const wrapped = mount(
        <Root>
            <Home />
        </Root>,
    );

    axios.get('http://localhost:3000');

    moxios.wait(() => {
        wrapped.update();

        expect(wrapped.find(TableRow));

        done();

        wrapped.unmount();
    });
});
