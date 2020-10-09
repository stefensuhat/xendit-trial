import { TableRow } from '@material-ui/core';
import { mount } from 'enzyme';
import { TableCell } from 'pages/home/components';
import React from 'react';
import Root from 'Root';

let wrapped;
beforeEach(() => {
    wrapped = mount(<Root><TableCell onDetailClick={() => null} /></Root>);
});

it('should render without crashing', () => {
    expect(wrapped.find(TableRow).length)
        .toEqual(1);
});

describe('Detail Button', () => {
    it('should find detail button', () => {
        expect(wrapped.find('#detail-button'));
    });

});
