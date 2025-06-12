import { apiBaseUrl } from "../../constants/environments/apiBaseUrl";
import { apiKey } from "../../constants/environments/apiKey";
import type { GetUserInventoryItemsData } from "./types";

export class API {
  getUserInventoryItems = async ({ userId }: GetUserInventoryItemsData) => {
    try {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(
        `${apiBaseUrl}/inventory?key=${apiKey}&steam_id=${userId}`,
      )}`;

      const response = await fetch(proxyUrl);
      return await response.json();
    } catch (getUserInventoryItemsErr) {
      console.error(getUserInventoryItemsErr);
    }
  };
}
