import axios from 'axios'

const NEXT_API_URL = process.env.NEXT_API_URL

interface RequestOptions {
  method?: string;
  path: string;
  data?: any;
  query?: any;
  header?: Record<string, any>;
}

const send = (options: RequestOptions) => {
  const {
    method = 'get', path, data = null, query = null, header = {}
  } = options

  const url = `${NEXT_API_URL}${path}`

  return new Promise(async (resolve) => {
    const res = await axios.get(url)
    return resolve(res?.data)
  })
}

export default { send }
