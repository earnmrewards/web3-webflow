type Method = "GET" | "POST";

interface Response<T> {
  data?: T;
  status: number;
}

function fetcher(route: string, method: Method, body?: unknown) {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
      "x-api-secret": import.meta.env.VITE_API_SECRET,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

async function get<T>(route: string): Promise<Response<T>> {
  const request = await fetcher(route, "GET");

  try {
    const response = await request.json();

    return { data: response, status: request.status };
  } catch (error) {
    return { status: request.status };
  }
}

async function post<T, K>(route: string, body: K): Promise<Response<T>> {
  const request = await fetcher(route, "POST", body);

  try {
    const response = await request.json();

    return { data: response, status: request.status };
  } catch (error) {
    return { status: request.status };
  }
}

export const api = { get, post };
