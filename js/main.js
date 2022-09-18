'use strict'

const usersUrl = 'http://localhost:3000/users';
let deleteConfirmed = false;

// modal

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

const delModal = (id) => {
  const modalBackground = document.querySelector('.modal-background');
  modalBackground.style.display = 'flex';
  const closeX = document.querySelector('.close');
  const greenButton = document.querySelector('.green-btn');
  const redButton = document.querySelector('.red-btn');
  closeX.onclick = function () {
    modalBackground.style.display = 'none';
  };
  greenButton.onclick = function () {
    modalBackground.style.display = 'none';
    delUser(id);
  };
  window.onclick = function (event) {
    if (event.target === modalBackground) {
      modalBackground.style.display = 'none';
    }
  };
  redButton.onclick = function () {
    modalBackground.style.display = 'none';
  };
};

const delUser = (id) => {
  console.log('bakckend delete', id);
  // delete from backend
  const usersUrlDel = `${usersUrl}/${id}`;
  (async () => {
    const usersData = await fetchData(usersUrlDel, fetchOptionsDelete);
    displayUsersData(usersData);
    addButtonListeners();
  })();
};

const addButtonListeners = () => {
  const editButtons = document.querySelectorAll('.editBtn');
  const delButtons = document.querySelectorAll('.delBtn');
  for (let i = 0; i < editButtons.length; i += 1) {
    const id = editButtons[i].parentElement.parentElement.querySelector('.id').innerHTML;
    editButtons[i].addEventListener('click', () => editUser(id));
  }

  for (let i = 0; i < delButtons.length; i += 1) {
    const id = delButtons[i].parentElement.parentElement.querySelector('.id').innerHTML;
    delButtons[i].addEventListener('click', () => {
      delModal(id);
    });
  }
};

const editUser = (id) => {
  // update backend
  // update object
  console.log('edit id:', id);
};

(async () => {
  const usersData = await fetchData(usersUrl, fetchOptionsRead);
  console.log(usersData);
  displayUsersData(usersData);
  addButtonListeners();
})();
