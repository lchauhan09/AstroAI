import { api } from "../api/client";

export async function getDashboardData() {
  return await api("/dashboard/");
}

export async function getWeeklyForecast() {
  return await api("/dashboard/weekly");
}
