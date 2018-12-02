export default async function saveManager(data) {
  let response = await fetch('http://localhost:3001/api/managers', {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  });
  let manager = await response.json();
  return manager;
}
