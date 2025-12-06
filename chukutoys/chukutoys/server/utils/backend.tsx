export async function callStrapiAPI(endpoint: any, errorMsg: any, method: any) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_ORIGIN}/api${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(errorMsg);
    }

    const responseData = await response.json();    

    if (!responseData?.data) {
      return responseData;
    }

    return responseData.data;
  } catch (error: any) {
    console.error({ error: error.message || error });
  }
}
