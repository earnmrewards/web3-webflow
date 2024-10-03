import { api } from "../services/api";

interface Request {
  email: string;
  url: string;
}

export async function emailSubmission({ email, url }: Request) {
  try {
    const { status } = await api.post(
      "/submit",
      {
        email,
        url,
      },
      "SMART_NODES"
    );

    return status === 200;
  } catch {
    return false;
  }
}
