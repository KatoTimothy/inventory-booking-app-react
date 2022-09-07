const getData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("There was a problem loading data.");
  }
  return await res.json();
};

export default getData;
