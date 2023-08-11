export async function createNewLine(data, config) {
  const body = JSON.stringify(data);

  console.log(config);

  try {
    const response = await fetch(config.FLOWISE_URI, {
      headers: {
        Authorization: "Bearer " + config.FLOWISE_BEARER,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}
