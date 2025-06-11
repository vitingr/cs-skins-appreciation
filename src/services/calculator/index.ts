import { RARITY_SCORE } from "../../constants/calculator/rarity";
import type {
  CalculateAppreciationChance,
  GetPriceScoreData,
  GetQuantityScoreData,
  GetRarityScoreData,
  GetSpecialAttributesScore,
} from "./types";

export class Calculator {
  getRarityScore({ rarity }: GetRarityScoreData): number {
    return RARITY_SCORE[rarity] ?? 0;
  }

  getQuantityScore({
    marketQuantity,
    maxMarketQuantity,
  }: GetQuantityScoreData): number {
    const ratio = marketQuantity / maxMarketQuantity;
    return 1 - Math.min(ratio, 1);
  }

  getPriceScore({ currentPrice, maxCategoryPrice }: GetPriceScoreData): number {
    return Math.min(currentPrice / maxCategoryPrice, 1);
  }

  getSpecialAttributesScore({ attributes }: GetSpecialAttributesScore): number {
    const total = attributes.reduce((acc, attr) => acc + attr, 0);
    return Math.min(total, 1);
  }

  getTypeScore(type: string): number {
    const bonusTypes = [
      "usp-s",
      "glock-18",
      "desert eagle",
      "ak-47",
      "m4a4",
      "m4a1-s",
      "awp",
    ];
    return bonusTypes.includes(type) ? 1 : 0;
  }

  calculateAppreciationChance({
    currentPrice,
    marketQuantity,
    maxCategoryPrice,
    maxMarketQuantity,
    rarity,
    specialAttributes,
    type,
  }: CalculateAppreciationChance): number {
    const rarityScore = this.getRarityScore({ rarity });
    const quantityScore = this.getQuantityScore({
      marketQuantity,
      maxMarketQuantity,
    });
    const priceScore = this.getPriceScore({ currentPrice, maxCategoryPrice });
    const specialAttributesScore = this.getSpecialAttributesScore({
      attributes: specialAttributes,
    });
    const typeScore = this.getTypeScore(type.toLowerCase());

    const chance =
      rarityScore * 0.15 +
      quantityScore * 0.1 +
      priceScore * 0.1 +
      specialAttributesScore * 0.05 +
      typeScore * 0.1;

    return parseFloat((chance * 100).toFixed(2));
  }
}
