function createCookie(name, value, hours = 24) {
  const date = new Date();
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
  const expires = `; expires=${date.toGMTString()}`;
  console.log(`${name}=${value + expires}; path=/`);
  document.cookie = `${name}=${value + expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return (parts.length === 2) ? parts.pop().split(';').shift() : false;
}

export {
  createCookie,
  getCookie
};
