export async function createNewLine(data) {
  const body = JSON.stringify(data);

  try {
    console.log(data);
    const response = await fetch(process.env.FLOWISE_URI, {
      headers: {
        Authorization: "Bearer " + process.env.FLOWISE_BEARER,
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
