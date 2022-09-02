const getData = async (url) => {
  const res = await fetch(url);
    if (!res.ok) {
        throw Error("There was problem fetching data");
    }
    return await res.json();
};

export default getData;
