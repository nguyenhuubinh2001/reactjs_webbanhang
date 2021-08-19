import axios from 'axios';
import * as Config from './Config'

export default function callApi(endpoint, method = 'GET', data,params,headers) {
    return axios(
        {
            url: `${Config.API_URL}/${endpoint}`, //Template literals
            method: method, 
            data: data,
            params: params,
            headers: headers
        }
    )

}