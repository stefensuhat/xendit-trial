import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import selectPlugin from '@rematch/select';
// import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import models from './models';

const history = createBrowserHistory();
const loading = createLoadingPlugin();

const rootReducer = () => ({
    // router: connectRouter(history),
});

const rematch = init({
    models,
    redux: {
        devtoolOptions: {
        },
        reducers: rootReducer(history),
    },
    plugins: [loading, selectPlugin()],
});

export const { select, getState, dispatch } = rematch;

export default rematch;
