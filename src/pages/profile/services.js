import axios from 'axios';
import { baseUrl } from 'utils';

class ProfileService {
    constructor() {
        this.axios = axios;
    }

    async get() {
        return this.axios.get(`${baseUrl}/business`)
            .then((response) => response.data[0]);
    }

    async post(formData, id, options) {

    }
}

export default new ProfileService();
