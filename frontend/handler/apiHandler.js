import { server } from "../config"

export const postData = (type, userData) => {
  let baseURL = `${server}`;
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept": "application/json",
  });
  return new Promise((resolve, reject) => {
    fetch(baseURL+type, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('server response', res)
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};
export const sendData = (type, token, userData) => {
  let baseURL = `${server}`;
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization" : `Bearer ${token}`,
    "Accept": "application/json",
  });
  return new Promise((resolve, reject) => {
    fetch(baseURL+type, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('server response', res)
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};


export const getData = (type, token) => {
  let baseURL = `${server}`;
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization" : `Bearer ${token}`,
    "Accept": "application/json",
  });
  return new Promise((resolve, reject) => {
    fetch(baseURL + type, {
      method: 'GET',
      headers:headers
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

export const updateData = (type, token, userData) => {
  let baseURL = `${server}`;
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization" : `Bearer ${token}`,
    "Accept": "application/json",
  });
  return new Promise((resolve, reject) => {
    fetch(baseURL + type, {
      method: 'PUT',
      headers:headers,
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

export const deleteData = (type, token) => {
  let baseURL = `${server}`;
  let headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization" : `Bearer ${token}`,
    "Accept": "application/json",
  });
  return new Promise((resolve, reject) => {
    fetch(baseURL + type, {
      method: 'DELETE',
      headers:headers
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};






