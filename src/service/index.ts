import axios from 'axios';

export const api = axios.create({
  baseURL: "https://jabtyper-tech-backend.herokuapp.com/"
});