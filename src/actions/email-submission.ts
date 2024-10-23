import { api } from "@/services/api";

interface Request {
  email: string;
  url: string;
  partnerId?: string;
}

export async function emailSubmission({ email, url, partnerId }: Request) {
  try {
    const { status } = await api.post(
      `/submit${partnerId ? `?partner=${partnerId}` : ""}`,
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
