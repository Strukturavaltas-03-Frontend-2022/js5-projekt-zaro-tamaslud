'use strict'

const usersUrl = 'http://localhost3000/users';

function handleResult(response) {
  console.log(response);
}

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.users;
  } catch (error) {
    console.error(error);
  }
}

request(usersUrl).then(handleResult)

/*
const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response, ok) {
      throw new Error ('HTTP error' + response.statusText)
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error:' + err.message);
  }
};
*/
