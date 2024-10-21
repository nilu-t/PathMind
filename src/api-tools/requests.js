import axios from "axios";

export const sendPostRequest = async(route_name, data, config={}) => {
    try{
        const response = await axios.post(route_name, data, config);
        console.log(`response from POST request is ${JSON.stringify(response.data, null, 2)}`);
        return response.data
    }
    catch (error) {
        console.log(`error from POST request is ${error.message}`);
    }
};

export const sendGetRequest = async (route_name) => {
    try {
        const response = await axios.get(route_name);
        console.log(`response from GET request is ${JSON.stringify(response.data, null, 2)}`);
        return response.data;
    } catch (error) {
        console.log(`error from GET request is ${error}`);
    }
};