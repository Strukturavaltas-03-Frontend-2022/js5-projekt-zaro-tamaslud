'use strict'

const usersUrl = 'http://localhost:3000/users';

// GET data from server

const fetchOptionsRead = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
};
const fetchOptionsUpdate = {
  method: 'PUT',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
};
const fetchOptionsDelete = {
  method: 'DELETE',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
};

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return {};
  }
};

const displayUsersData = (usersData) => {
  for (let i = 0; i < usersData.length; i += 1) {
    const tableRow = `
  <tr>
  <td>${usersData[i].id}</td>
  <td>${usersData[i].name}</td>
  <td>${usersData[i].email}</td>
  <td>${usersData[i].address}</td>
  <td>
      <button class="editBtn">Edit</button>
      <button class="delBtn">Del</button>
  </td>
</tr>
  `;
    document.querySelector('tbody').insertAdjacentHTML('beforeend', tableRow);
  }
};

(async () => {
  const usersData = await fetchData(usersUrl, fetchOptionsRead);
  console.log(usersData);
  displayUsersData(usersData);
})();
