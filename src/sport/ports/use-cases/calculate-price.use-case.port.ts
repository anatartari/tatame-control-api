export const CALCULATE_PRICE_USE_CASE = Symbol('CALCULATE_PRICE_USE_CASE');

export interface ICalculatePriceUseCase {
  execute(sportIds: string[]): Promise<number>;
}

