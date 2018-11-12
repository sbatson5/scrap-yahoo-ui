export default async function fetchManagerById(managerId) {
  let response = await fetch(`http://localhost:3001/api/managers/${managerId}`, {
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
  let manager = await response.json();
  return manager;
}
