import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RestUtil = async (
    endPoint,
    { method = 'GET', headers = {}, body = {}, useAuthorization = true },
) => {
    let token = await AsyncStorage.getItem('token')

    let defaultHeader = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    if (useAuthorization) {
        defaultHeader.Authorization = 'Bearer ' + token;
    }

    let config = {
        method: method,
        headers: {
            ...defaultHeader,
            ...headers,
        },
    };

    if (method.toUpperCase() !== 'GET') {
        config.body = body;
    }

    return fetch(endPoint, config);
};

export { RestUtil as default };