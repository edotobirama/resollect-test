import apiClient from "./apiClient";

export const getAuctions = async () => {
  try {
    const response = await apiClient.get("/auctions");
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions", error);
    throw error;
  }
};
