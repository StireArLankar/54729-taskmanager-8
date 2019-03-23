const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class ServiceAPI {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: `tasks`})
      .then((result) => result.json());
  }

  createTask({task}) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((result) => result.json());
  }

  updateTask({id, data}) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then((result) => result.json());
  }

  deleteTask({id}) {
    return this._load({url: `tasks/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch(alert);
  }
}

export default ServiceAPI;
