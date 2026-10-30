export async function logout() {
  const baseUrl =
    window.APP_DATA?.rest_url || "https://admin.360logistics.kz/wp-json/";
  const nonce = window.APP_DATA?.nonce;
  const response = await fetch(
    `${baseUrl.replace(/\/+$/, "")}/auth/v1/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(nonce && { "X-WP-Nonce": nonce }),
      },
    },
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "errors.logout");
  }
}
