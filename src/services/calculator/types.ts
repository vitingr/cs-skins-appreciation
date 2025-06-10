import type { RARITY_SCORE } from "../../constants/calculator/rarity";

export interface GetRarityScoreData {
  rarity: keyof typeof RARITY_SCORE;
}

export interface GetQuantityScoreData {
  marketQuantity: number;
  maxMarketQuantity: number;
}

export interface GetPriceScoreData {
  currentPrice: number;
  maxCategoryPrice: number;
}

export interface GetSpecialAttributesScore {
  attributes: number[];
}

export interface CalculateAppreciationChance {
  rarity: keyof typeof RARITY_SCORE;
  marketQuantity: number;
  maxMarketQuantity: number;
  currentPrice: number;
  maxCategoryPrice: number;
  specialAttributes: number[];
  type: string
}
