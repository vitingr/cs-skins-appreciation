import type { AxiosInstance } from "axios";
import axios from "axios";
import { apiBaseUrl } from "../../constants/environments/apiBaseUrl";
import { apiKey } from "../../constants/environments/apiKey";
import type { GetUserInventoryItemsData } from "./types";

export class API {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: apiBaseUrl,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
  }

  getUserInventoryItems = async ({ userId }: GetUserInventoryItemsData) => {
    try {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(
        `https://www.steamwebapi.com/steam/api/inventory?key=${apiKey}&steam_id=${userId}`,
      )}`;

      const response = await fetch(proxyUrl);
      return await response.json();
    } catch (getUserInventoryItemsErr) {
      console.error(getUserInventoryItemsErr);
    }
  };
}
