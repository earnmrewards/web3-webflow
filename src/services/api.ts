type Method = "GET" | "POST";

interface Response<T> {
  data?: T;
  status: number;
}

const APIs = {
  TOOLKIT: import.meta.env.VITE_API_BASE_URL,
  SMART_NODES: import.meta.env.VITE_SMART_NODES_API,
  SN_PARTNER: import.meta.env.VITE_SMART_NODES_PARTNER_API,
} as const;

interface FetcherData {
  route: string;
  method: Method;
  body?: unknown;
  api?: keyof typeof APIs;
}

function fetcher({ route, method, body, api = "TOOLKIT" }: FetcherData) {
  return fetch(`${APIs[api]}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_API_KEY,
      "x-api-secret": import.meta.env.VITE_API_SECRET,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

async function get<T>(
  route: string,
  api?: keyof typeof APIs
): Promise<Response<T>> {
  const request = await fetcher({ route, method: "GET", api });

  try {
    const response = await request.json();

    return { data: response, status: request.status };
  } catch (error) {
    return { status: request.status };
  }
}

async function post<T, K>(
  route: string,
  body: K,
  api?: keyof typeof APIs
): Promise<Response<T>> {
  const request = await fetcher({ route, method: "POST", body, api });

  try {
    const response = await request.json();

    return { data: response, status: request.status };
  } catch (error) {
    return { status: request.status };
  }
}

export const api = { get, post };
