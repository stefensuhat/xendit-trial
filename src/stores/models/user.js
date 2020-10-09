import { Api, fetch } from 'utils';

const defaultState = { items: [], meta: { per_page: '1', page: 1, count: 1 } };

const model = {
    state: defaultState,
    reducers: {
        fetchResponse: (state, payload) => ({ ...state, items: payload.data, meta: payload.meta }),
    },
    effects: {
        async fetch(params) {
            await fetch.get(Api.partnerUrl(), { params })
                .then((response) => this.fetchResponse(response));
        },
    },
};

export default model;
