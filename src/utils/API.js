const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "https://jordplan.no"
    : "https://my-mid.cyclic.app/jordplan.no";
const TOKEN = "xqDbSZEfPbQwGpbKw3o6Yhaby950HlxjzxYJmX8G";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

const API = {
  getWeather: async (userId, params) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/craspy/weather/${userId}?${query}`,
      {
        headers,
      }
    );
    return response.json();
  },
};

export default API;
