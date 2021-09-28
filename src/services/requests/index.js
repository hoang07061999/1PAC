import  axios  from  'axios';

const BASE_URL_COVID="https://api.covid19api.com/";
const BASE_URL_COUNTRY="https://countriesnow.space/api/v0.1/countries/";

const  getCountriesService  = async ()  =>  {
    const res = await axios.get(`${BASE_URL_COVID}summary`);
    return res.data;
}

export const getDataCovidByDate = async (name, params) => {
    const res = await axios.get(`${BASE_URL_COVID}country/${name}`, {params});
    return res.data;
}

export const getInfoCountry = async (params) => {
    const res = await axios.post(`${BASE_URL_COUNTRY}population`, {country: params});
    return res.data.data;
}

export const getFlagCountry = async (params) => {
    const res = await axios.post(`${BASE_URL_COUNTRY}flag/images`, {country: params});
    return res.data.data;
}

export const getCapitalCountry = async (params) => {
    const res = await axios.post(`${BASE_URL_COUNTRY}capital`, {country: params});
    return res.data.data;
}



export  default  getCountriesService;