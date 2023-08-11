export async function createNewLine(data) {
  const body = JSON.stringify(data);

  try {
    console.log(data);
    const response = await fetch(
      "https://flowise-ph0q.onrender.com/api/v1/prediction/5f8310fd-276d-46f2-92ac-bf8016eed4db",
      {
        headers: {
          Authorization: "Bearer H67BBmrDEmyDZEuvhsSCwlGfg4eHmWfvCCw9RqYE68s=",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}
