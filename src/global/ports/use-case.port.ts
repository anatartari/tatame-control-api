/**
 * Base use case port interface
 * Use cases define application-level operations
 */
export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

