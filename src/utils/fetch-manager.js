export default function fetchManager(managerId) {
  console.log(managerId);
  return fetch(`http://localhost:3001/api/managers/${managerId}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer"
  })
  .then(response => {
    return response.json().then((manager) => {
      return manager;
    });
  }).catch((error) => {
    return error;
  });
}
