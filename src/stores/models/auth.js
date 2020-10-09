/**
 * Project panel
 *
 * Created by stefensuhat on 08/08/18 3.34 PM
 */

import { get, post } from 'axios';
import cogoToast from 'cogo-toast';
import CryptoJS from 'crypto-js';
import { v4 as uuidV4 } from 'uuid';

const baseUrl = process.env.REACT_APP_API_ROOT;
const applicationKey = process.env.REACT_APP_KEY;

export function removeAllAuthCookies() {
    localStorage.clear();

    window.location.assign('/auth/login');
}

function setAuthorization(response) {
    const accessToken = response.token;

    localStorage.setItem('accessToken', accessToken);
}

const defaultState = {
    authenticated: false,
    profile: null,
    errors: null,
};

export default {
    state: defaultState,
    reducers: {
        resetAuth: (state) => ({ ...state, ...defaultState }),
        loginResponse: (state, payload) => {
            if (payload.errors) {
                removeAllAuthCookies();

                return {
                    ...state,
                    errors: payload.errors,
                };
            }

            setAuthorization(payload);
            console.log('payload: ', payload);

            localStorage.setItem('user', JSON.stringify(payload.user));

            return {
                ...state,
                authenticated: true,
                profile: payload.user,
            };
        },
        verificationResponse: (state, payload) => {
            if (payload.token) {
                return {
                    ...state,
                    authenticated: true,
                    profile: JSON.parse(localStorage.getItem('user')),
                };
            }

            return {
                ...state,
                authenticated: false,
            };
        },
        logoutResponse: (state) => {
            removeAllAuthCookies();
            return {
                ...state,
                authenticated: false,
            };
        },
    },
    effects: {
        login(formData) {
            get(`${baseUrl}/users`, { email_like: formData.email })
                .then(({ data }) => {
                    if (data) {
                        const { password } = data[0];
                        const bytes = CryptoJS.AES.decrypt(password, applicationKey);
                        const stringPassword = bytes.toString(CryptoJS.enc.Utf8);

                        if (stringPassword === formData.password) {
                            cogoToast.success('Logged in successful');
                            this.loginResponse({
                                token: uuidV4(),
                                user: { email: formData.email },
                            });

                            return;
                        }
                    }

                    cogoToast.error('Invalid email or password');
                })
                .catch((error) => cogoToast.error('Invalid email or password'));
        },

        register(formData) {
            const encyrptedPassword = CryptoJS.AES.encrypt(formData.password, applicationKey)
                .toString();

            get(`${baseUrl}/users`, { email: formData.email })
                .then((response) => {
                    if (response.data.length > 0) {
                        return cogoToast.error('Email already registered.');
                    }

                    post(`${baseUrl}/users`, {
                        ...formData,
                        password: encyrptedPassword,
                    })
                        .then(() => {
                            post(`${baseUrl}/newsletter`, { email: formData.email })
                                .then(() => cogoToast.success('Account has been created'));
                        })
                        .catch((error) => {
                            cogoToast.error(error);
                        });
                });
        },

        logout() {
            this.logoutResponse();
        },

        async verifyToken() {
            const token = localStorage.getItem('accessToken');

            await this.verificationResponse({ token });
        },
    },
};
