'use strict'

const usersUrl = 'http://localhost:3000/users';
const sampleObject = {
  id: 0,
  name: '',
  email: '',
  address: '',
};
// fetch options CRUD
const fetchOptionsCreate = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(sampleObject),
};
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
  body: JSON.stringify(sampleObject),
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

const showModal = (id, mode) => {
  console.log('modal called', mode, 'mode');
  const [originalName, originalEmail, originalAddress] = getUserDataById(id);
  const modalBackground = document.querySelector('.modal-background');
  modalBackground.style.display = 'flex';
  const closeX = document.querySelector('.close');
  const cancelButton = document.querySelector('.cancel-btn');
  document.querySelector('.modal__header').innerHTML = `${mode} user`
  document.querySelector('#modal__name').setAttribute('value', originalName);
  document.querySelector('#modal__email').setAttribute('value', originalEmail);
  document.querySelector('#modal__address').setAttribute('value', originalAddress);
  const saveButton = document.querySelector('.save-btn');
  const deleteButton = document.querySelector('.delete-btn');
  const modalName = document.querySelector('#modal__name');
  const modalEmail = document.querySelector('#modal__email');
  const modalAddress = document.querySelector('#modal__address');

  if (mode === 'Delete') {
    modalName.setAttribute('readonly', true);
    modalEmail.setAttribute('readonly', true);
    modalAddress.setAttribute('readonly', true);
    saveButton.style.display = 'none';
    deleteButton.style.display = 'inline';
    deleteButton.onclick = () => {
      modalBackground.style.display = 'none';
      delUser(id);
    };
  }

  if (mode === 'Edit') {
    modalName.removeAttribute('readonly', true);
    modalEmail.removeAttribute('readonly', true);
    modalAddress.removeAttribute('readonly', true);
    saveButton.style.display = 'inline';
    deleteButton.style.display = 'none';
    saveButton.onclick = () => {
      modalBackground.style.display = 'none';
      const editedName = modalName.value;
      const editedEmail = modalEmail.value;
      const editedAddress = modalAddress.value;
      editUser(id, editedName, editedEmail, editedAddress);
    };
  }

  if (mode === 'Add new') {
    modalName.removeAttribute('readonly', true);
    modalEmail.removeAttribute('readonly', true);
    modalAddress.removeAttribute('readonly', true);
    document.querySelector('#modal__name').setAttribute('value', '');
    document.querySelector('#modal__email').setAttribute('value', '');
    document.querySelector('#modal__address').setAttribute('value', '');
    saveButton.style.display = 'inline';
    deleteButton.style.display = 'none';
    saveButton.onclick = () => {
      modalBackground.style.display = 'none';
      const editedName = modalName.value;
      const editedEmail = modalEmail.value;
      const editedAddress = modalAddress.value;
      addNewUser(id, editedName, editedEmail, editedAddress);
    };
  }

  closeX.onclick = () => {
    modalBackground.style.display = 'none';
  };
  window.onclick = (event) => {
    if (event.target === modalBackground) {
      modalBackground.style.display = 'none';
    }
  };
  cancelButton.onclick = () => {
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
  const addUserButton = document.querySelector('.addUserBtn');
  addUserButton.addEventListener('click', () => showModal(0, 'Add new'));

  for (let i = 0; i < editButtons.length; i += 1) {
    const id = editButtons[i].parentElement.parentElement.querySelector('.id').innerHTML;
    editButtons[i].addEventListener('click', () => showModal(id, 'Edit'));
  }

  for (let i = 0; i < delButtons.length; i += 1) {
    const id = delButtons[i].parentElement.parentElement.querySelector('.id').innerHTML;
    delButtons[i].addEventListener('click', () => {
      showModal(id, 'Delete');
    });
  }
};

const editUser = (id, editedName, editedEmail, editedAddress) => {
  // modify backend
  fetchOptionsUpdate.body = JSON.stringify({
    id: `${id}`,
    name: `${editedName}`,
    email: `${editedEmail}`,
    address: `${editedAddress}`,
  });
  const usersUrlUpdate = `${usersUrl}/${id}`;
  (async () => {
    const usersData = await fetchData(usersUrlUpdate, fetchOptionsUpdate);
    displayUsersData(usersData);
  })();
};

const addNewUser = (id, editedName, editedEmail, editedAddress) => {
  // modify backend
  fetchOptionsCreate.body = JSON.stringify({
    name: `${editedName}`,
    email: `${editedEmail}`,
    address: `${editedAddress}`,
  });
  const usersUrlAddNewUser = `${usersUrl}`;
  (async () => {
    const usersData = await fetchData(usersUrlAddNewUser, fetchOptionsCreate);
    displayUsersData(usersData);
  })();
};

// GET data from backend
(async () => {
  const usersData = await fetchData(usersUrl, fetchOptionsRead);
  console.log('data fetched from JSON');
  console.log(usersData);
  displayUsersData(usersData);
  addButtonListeners();
})();
