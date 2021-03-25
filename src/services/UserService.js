import axios from 'axios';
import * as R from 'ramda';


class UserService {

    put(endpoint, body) {
        return axios.get(endpoint, body)
        .then((response) => {
          if (R.equals(R.prop('status', response), 200)) {
            return response.data;
          }
          return null;
        });
    }

    post(endpoint, body) {
        return axios.post(endpoint, body)
        .then((response) => {
          if (R.equals(R.prop('status', response), 200)) {
            return response.data;
          }
          return null;
        });
    }
    get(endpoint) {
        return axios.get(endpoint)
            .then((response) => {
              if (R.equals(R.prop('status', response), 200)) {
                return response.data;
              }
              return null;
            });
    }
}

export default new UserService();