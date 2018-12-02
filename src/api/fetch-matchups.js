export default async function fetchMatchups({ managerId, opponentId }) {
  let url = 'http://localhost:3001/api/matchups';
  if (managerId) {
    url = `${url}?manager_id=${managerId}`;
  } else if (opponentId) {
    url = `${url}?opponent_id=${opponentId}`;
  }
  let response = await fetch(url, {
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
  let matchups = await response.json();
  return matchups;
}
