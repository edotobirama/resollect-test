import apiClient from "./apiClient";

export const getLoans = async () => {
  try {
    const response = await apiClient.get("/loans");
    return response.data;
  } catch (error) {
    console.error("Error fetching loans", error);
    throw error;
  }
};