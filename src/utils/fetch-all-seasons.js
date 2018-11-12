export default async function fetchAllSeasons() {
  let response = await fetch('http://localhost:3001/api/seasons', {
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
  let seasons = await response.json();
  return seasons;
}
