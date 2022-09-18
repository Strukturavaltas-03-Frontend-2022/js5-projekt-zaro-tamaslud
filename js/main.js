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
  document.querySelector('table .usersData').innerHTML = '';
  for (let i = 0; i < usersData.length; i += 1) {
    const tableRow = `
  <tr>
  <td class='id'>${usersData[i].id}</td>
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
const addButtonListeners = () => {
  const editButtons = document.querySelectorAll('.editBtn');
  const delButtons = document.querySelectorAll('.delBtn');
  for (let i = 0; i < editButtons.length; i += 1) {
    const id = editButtons[i].parentElement.parentElement.fi;
    editButtons[i].addEventListener('click', () => editUser(id));
  }
  for (let i = 0; i < delButtons.length; i += 1) {
    const id = delButtons[i].parentElement.parentElement.querySelector('.id').innerHTML;
    delButtons[i].addEventListener('click', () => delUser(id));
  }
};

const editUser = (id) => {
  // update backend
  // update object
  console.log('edit id:', id);
  displayUsersData(usersData);
};

const delUser = (id) => {
  // delete from backend
  const usersUrlDel = `${usersUrl}/${id}`;
  (async () => {
    const usersData = await fetchData(usersUrlDel, fetchOptionsDelete);
    displayUsersData(usersData);
    addButtonListeners();
  })();
};

(async () => {
  const usersData = await fetchData(usersUrl, fetchOptionsRead);
  console.log(usersData);
  displayUsersData(usersData);
  addButtonListeners();
})();
