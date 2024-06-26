import { functions, httpsCallable } from '../config/firebase';

async function callFunction(data, functionName) {
  const myFunction = httpsCallable(functions, functionName);
  const result = await myFunction(data);
  return result.data;
}

export async function listUsers() {
  const { users } = await callFunction({}, 'listUsers');
  return users;
}

export async function createUser(data) {
  const result = await callFunction(data, 'createUser');
  return result;
}

export async function updateUser(data) {
  const result = await callFunction(data, 'updateUser');
  return result;
}

export async function changeUserStatus(data) {
  const result = await callFunction(data, 'changeUserStatus');
  return result;
}

export async function deleteUser(data) {
  const result = await callFunction(data, 'deleteUser');
  return result;
}

export async function getUsernamesFromIds(data) {
  const result = await callFunction(data, 'getNamesByUIDs');
  return result;
}
