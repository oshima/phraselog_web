import { getIdToken } from '~/auth';

async function _get(endpoint, params) {
  try {
    const res = await fetch(endpoint + paramsToString(params));
    return res.ok && (await res.json());
  } catch (e) {
    return false;
  }
}

async function _post(endpoint, data) {
  try {
    const idToken = await getIdToken();
    if (!idToken) return false;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function _put(endpoint, data) {
  try {
    const idToken = await getIdToken();
    if (!idToken) return false;
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function _delete(endpoint) {
  try {
    const idToken = await getIdToken();
    if (!idToken) return false;
    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${idToken}`
      })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

function paramsToString(params) {
  if (!params) return '';
  const keys = Object.keys(params);
  if (keys.length === 0) return '';
  return '?' + keys.map(key => `${key}=${params[key]}`).join('&');
}

export function createUser(data) {
  return _post('/api/users', data);
}

export function fetchUser(id_string) {
  return _get(`/api/users/${id_string}`);
}

export function fetchPhrases(params) {
  return _get('/api/phrases', params);
}

export function createPhrase(data) {
  return _post('/api/phrases', data);
}

export function fetchPhrase(id_string) {
  return _get(`/api/phrases/${id_string}`);
}

export function updatePhrase(id_string, data) {
  return _put(`/api/phrases/${id_string}`, data);
}

export function deletePhrase(id_string) {
  return _delete(`/api/phrases/${id_string}`);
}

export function fetchUserPhrases(user_id_string, params) {
  return _get(`/api/users/${user_id_string}/phrases`, params);
}

export function fetchUserLikedPhrases(user_id_string, params) {
  return _get(`/api/users/${user_id_string}/liked_phrases`, params);
}

export function createUserLikedPhrase(user_id_string, data) {
  return _post(`/api/users/${user_id_string}/liked_phrases`, data);
}

export function fetchUserLikedPhrase(user_id_string, id_string) {
  return _get(`/api/users/${user_id_string}/liked_phrases/${id_string}`);
}

export function deleteUserLikedPhrase(user_id_string, id_string) {
  return _delete(`/api/users/${user_id_string}/liked_phrases/${id_string}`);
}
