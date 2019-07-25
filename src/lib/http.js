import HttpRequest from '@/lib/axios'
import config from '@/config'
const baseUrl = config.baseURL;
const axios = new HttpRequest(baseUrl);
export default axios;