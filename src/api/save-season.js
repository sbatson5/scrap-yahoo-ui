export default async function saveSeason(data) {
  let response = await fetch(`http://localhost:3001/api/seasons/${data.id}`, {
    method: "PUT",
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
  let season = await response.json();
  return season;
}
