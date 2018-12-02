export default async function fetchAllManagers() {
  let response = await fetch('http://localhost:3001/api/managers', {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer"
  });
  let managers = await response.json();
  return managers;
}
