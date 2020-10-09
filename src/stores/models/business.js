import axios from 'axios';
import cogoToast from 'cogo-toast';
import collect from 'collect.js';

const baseUrl = process.env.REACT_APP_API_ROOT;
const defaultState = {
    items: [],
    availableFilters: [],
    item: {},
    kycEditMode: false,
};

const model = {
    state: defaultState,
    reducers: {
        toggleKycEditMode(state, payload) {
            return {
                ...state,
                kycEditMode: payload,
            };
        },
        fetchResponse(state, payload) {
            return {
                ...state,
                items: payload.data,
            };
        },
        fetchSingleResponse(state, payload) {
            return {
                ...state,
                item: payload,
            };
        },
        getFilters(state, payload) {
            const collection = collect(state.items);
            const availableFilters = collection.unique(payload)
                .map((item) => item[payload])
                .sort()
                .all();

            return { ...state, availableFilters };
        },
    },
    effects: {
        async fetch() {
            await axios.get(`${baseUrl}/businesses`)
                .then(({ data }) => {
                    this.fetchResponse({ data });
                });
        },
        async fetchSingle() {
            await axios.get(`${baseUrl}/business`)
                .then(({ data }) => {
                    this.fetchSingleResponse(data[0]);
                });
        },

        async post(formData) {
            await axios.put(`${baseUrl}/business/1`, formData)
                .then(({ data }) => {
                    console.log('data: ', data);

                    cogoToast.success('Save success');
                    this.fetchSingleResponse(data);
                });
        },
    },
};

export default model;
