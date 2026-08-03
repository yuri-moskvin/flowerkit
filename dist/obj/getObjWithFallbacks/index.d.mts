type TRuleType = "string" | "number" | "boolean" | "object" | "array";
type TRulesSchema<TInput extends Record<string, unknown>, TOutput extends Record<string, unknown>> = {
    [K in keyof TInput]?: {
        output?: keyof TOutput | string;
        type?: TRuleType;
        fallback?: unknown;
        getValue?: (value: TInput[K], fallback: unknown) => unknown;
    };
};
export type TGetObjWithFallbacksArgs = Parameters<typeof getObjWithFallbacks>;
export type TGetObjWithFallbacksReturn = ReturnType<typeof getObjWithFallbacks>;
/**
 * Gets an object with fixed keys and values
 * @template TInput,TOutput
 * @param {TInput} data Source data
 * @param {TRulesSchema<TInput,TOutput>} [rules={}] Rules for transformation
 * @param {Partial<Record<TRuleType, unknown>>} [fallbacks={}] Fallback for each type of values
 * @returns {TOutput & Partial<TInput>} Transformed object
 * @throws {TypeError} getObjWithFallbacks: data must be a plain object
 * @throws {TypeError} getObjWithFallbacks: rules must be a plain object
 * @throws {TypeError} getObjWithFallbacks: rules validation failed
 * @example
 * // Normalize incomplete API data before rendering a user card
 * const user = getObjWithFallbacks(
 *   { name: "", age: undefined },
 *   {
 *     name: { type: "string", fallback: "Anonymous" },
 *     age: { type: "number", fallback: 0 },
 *   }
 * ); // { name: "Anonymous", age: 0 }
 * @example
 * // Rename an API field and provide a global fallback for missing strings
 * const product = getObjWithFallbacks(
 *   { product_name: null },
 *   { product_name: { output: "name", type: "string" } },
 *   { string: "Untitled product" }
 * ); // { name: "Untitled product" }
 */
export declare const getObjWithFallbacks: <TInput extends Record<string, unknown>, TOutput extends Record<string, unknown> = Record<string, unknown>>(data: TInput, rules?: TRulesSchema<TInput, TOutput>, fallbacks?: Partial<Record<TRuleType, unknown>>) => TOutput & Partial<TInput>;
export {};
