export async function storeUserData(
  amount: number,
  referralCode: string,
  email: string
) {
  const baseUrl = "https://api.com/";
  const request = await fetch(`${baseUrl}/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify({
        amount,
        referralCode,
        email,
      }),
    },
  });
  const response = await request.json();

  return response;
}
