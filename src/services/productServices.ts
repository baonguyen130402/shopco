import Request from "./request";

export default class ProductServices {
  static async getAllStation(data: any, newToken: string = '') {
    return new Promise(resolve => {
      Request.send({
        method: 'GET',
        path: 'products',
        data: { ...data },
        query: null,
        header: {
          Authorization: newToken,
        },
      }).then((result = {}) => {
        const data = result as any[]
        return resolve(data.length !== 0 ? data : null)
      })
    })
  }
}
