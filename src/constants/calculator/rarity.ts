export const RARITY_SCORE = {
  consumer: 0.0,
  industrial: 0.05,
  spec: 0.1,
  restricted: 0.1,
  classified: 0.5,
  covert: 0.8,
  contraband: 1.0
} as const

export const RARITY_ADAPTER = {
  "Consumer Grade": RARITY_SCORE.consumer,
  "Industrial Grade": RARITY_SCORE.industrial,
  "Mil-Spec Grade": RARITY_SCORE.spec,
  Classified: RARITY_SCORE.classified,
  Covert: RARITY_SCORE.covert,
  Contraband: RARITY_SCORE.contraband,
};