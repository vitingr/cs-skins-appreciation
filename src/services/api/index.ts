import { apiBaseUrl } from "../../constants/environments/apiBaseUrl";
import { apiKey } from "../../constants/environments/apiKey";
import { steamKey } from "../../constants/environments/steamKey";
import type { GetUserInventoryItemsData } from "./types";

export class API {
  getUserInventoryItems = async ({ userId }: GetUserInventoryItemsData) => {
    try {
      let steamId = userId;

      if (isNaN(Number(userId))) {
        const resolvedId = await this.resolveVanityURL(userId);
        if (!resolvedId) {
          throw new Error("Vanity URL inválida ou usuário não encontrado");
        }
        steamId = resolvedId;
      }

      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(
        `${apiBaseUrl}/inventory?key=${apiKey}&steam_id=${steamId}`,
      )}`;

      const response = await fetch(proxyUrl);
      return await response.json();
    } catch (getUserInventoryItemsErr) {
      console.error(getUserInventoryItemsErr);
    }
  };

  resolveVanityURL = async (username: string) => {
    try {
      const baseUrl =
        "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/";
      const fullUrl = `${baseUrl}?key=${steamKey}&vanityurl=${encodeURIComponent(username)}`;

      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(fullUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (data.response?.success === 1) {
        return data.response.steamid;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao converter nome de usuário para Steam ID:", error);
      return null;
    }
  };
}
