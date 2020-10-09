/**
 * Project panel
 *
 * Created by stefensuhat on 08/08/18 3.32 PM
 */


export default {
    state: { title: '', description: '' },
    reducers: {
        setTitle: (state, payload) => ({ ...state, title: payload.title, description: payload.description }),
    },
};


export const alert = {
    state: { content: {} },
    reducers: {
        create: (state, payload) => ({ ...state, content: payload }),
    },
};

export const alertDialog = {
    state: { content: {}, loading: false },
    reducers: {
        create: (state, payload) => ({ ...state, content: payload }),
        remove: state => ({ ...state, content: {}, loading: false }),
        loading: state => ({ ...state, loading: true }),
    },
};

export const snackbar = {
    state: { content: null },
    reducers: {
        create: (state, payload) => ({ ...state, content: payload }),
        remove: state => ({ ...state, content: null }),
    },
};
