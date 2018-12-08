export default function buildManagerCollection(collection = [], managerId) {
  let manager = collection.find((manager) => manager.id === managerId);
  if (!manager) {
    collection.push({ id: managerId, count: 1 });
  } else {
    manager['count']++;
  }
  return collection;
}
