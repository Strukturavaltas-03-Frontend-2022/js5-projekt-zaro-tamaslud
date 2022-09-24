'use strict'

const usersUrl = 'http://localhost:3000/users';

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
  let usersTable = '';
  for (let i = 0; i < usersData.length; i += 1) {
    const tableRow = `
  <tr>
  <td class = 'id'>${usersData[i].id}</td>
  <td class = 'name${usersData[i].id}'>${usersData[i].name}</td>
  <td class = 'email${usersData[i].id}'>${usersData[i].email}</td>
  <td class = 'address${usersData[i].id}'>${usersData[i].address}</td>
  <td>
      <button class="editBtn">Edit</button>
      <button class="delBtn">Del</button>
  </td>
</tr>`;
    usersTable = tableRow + usersTable;
  }
  document.querySelector('tbody').insertAdjacentHTML('afterbegin', usersTable);
};

const getUserDataById = (id) => {
  const name = document.querySelector(`.name${id}`).innerHTML;
  const email = document.querySelector(`.email${id}`).innerHTML;
  const address = document.querySelector(`.address${id}`).innerHTML;
  return [name, email, address];
};

const delModal = (id) => {
  const [originalName, originalEmail, originalAddress] = getUserDataById(id);
  const modalBackground = document.querySelector('.modal-background');
  modalBackground.style.display = 'flex';
  const closeX = document.querySelector('.close');
  const greenButton = document.querySelector('.green-btn');
  const redButton = document.querySelector('.red-btn');
  document.querySelector('#modal__name').setAttribute('value', originalName);
  document.querySelector('#modal__email').setAttribute('value', originalEmail);
  document.querySelector('#modal__address').setAttribute('value', originalAddress);
  document.querySelector('#modal__name').setAttribute('readonly', true);
  document.querySelector('#modal__email').setAttribute('readonly', true);
  document.querySelector('#modal__address').setAttribute('readonly', true);

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
