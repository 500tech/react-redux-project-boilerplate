import superagent from 'superagent';

export type Request = {
  method: string;
  url: string;
  data: any;
  headers: {
    [key: string]: string;
  };
};

const apiUtils = {
  request({ method, url, data = null, headers = {} }: Request) {
    const request = superagent(method.toUpperCase(), url).set(
      'Accept',
      'application/json'
    );

    if (data) {
      if (method.toUpperCase() === 'GET') {
        request.query(data);
      } else {
        request.send(data).set('Content-type', 'application/json');
      }
    }

    request.set(headers);

    return request.then((data: any) => data); // force request to be sent
  }
};

export default apiUtils;
