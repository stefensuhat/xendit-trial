import axios from 'axios';
import { baseUrl } from 'utils';

class HomeService {
    constructor() {
        this.axios = axios;
    }

    async get() {
        return this.axios.get(`${baseUrl}/businesses`)
            .then((response) => response.data);
    }
}

export default new HomeService();
