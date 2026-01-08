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

const validateRulesSchema = <TInput extends Record<string, unknown>, TOutput extends Record<string, unknown>>(
  rules: TRulesSchema<TInput, TOutput>
): void => {
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
    throw new TypeError("getObjWithFallbacks: rules must be a plain object");
  }

  Object.entries(rules).forEach(([ key, rule ]) => {
    if (rule === null || typeof rule !== "object" || Array.isArray(rule)) {
      throw new TypeError(`getObjWithFallbacks: rules.${key} must be a rule object`);
    }

    if (rule.output !== undefined && typeof rule.output !== "string") {
      throw new TypeError(`getObjWithFallbacks: rules.${key}.output must be a string`);
    }

    if (rule.type !== undefined) {
      const validTypes: TRuleType[] = [ "string", "number", "boolean", "object", "array" ];
      if (!validTypes.includes(rule.type)) {
        throw new TypeError(
          `getObjWithFallbacks: rules.${key}.type must be one of: ${validTypes.join(", ")}`
        );
      }
    }

    if (rule.getValue !== undefined && typeof rule.getValue !== "function") {
      throw new TypeError(`getObjWithFallbacks: rules.${key}.getValue must be a function`);
    }

    const validProperties = [ "output", "type", "fallback", "getValue" ];
    const hasValidProperties = validProperties.some((prop) => prop in rule);
    if (!hasValidProperties) {
      throw new TypeError(
        `getObjWithFallbacks: rules.${key} must have at least one of: ${validProperties.join(", ")}`
      );
    }
  });
};

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
 */
export const getObjWithFallbacks = <
  TInput extends Record<string, unknown>,
  TOutput extends Record<string, unknown> = Record<string, unknown>
>(
  data: TInput,
  rules: TRulesSchema<TInput, TOutput> = {},
  fallbacks: Partial<Record<TRuleType, unknown>> = {}
): TOutput & Partial<TInput> => {

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new TypeError("getObjWithFallbacks: data must be a plain object");
  }
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) {
    throw new TypeError("getObjWithFallbacks: rules must be a plain object");
  }

  validateRulesSchema(rules);

  const placeholders: Record<TRuleType, unknown> = {
    string: "",
    number: 0,
    boolean: false,
    object: {},
    array: [],
    ...fallbacks,
  } as const;

  const newItem: Record<string, unknown> = {};

  Object.entries(data).forEach(([ key, value ]) => {
    const rule = (rules as Record<string, TRulesSchema<TInput, TOutput>[string]>)[key];

    if (rule) {
      const {
        getValue,
        fallback,
        output = key?.toString() ?? "",
        type = (Array.isArray(value) ? "array" : (value === null ? "object" : typeof value)) as TRuleType,
      } = rule;

      const getFallback = (t: TRuleType) => (typeof fallback === "undefined" ? placeholders[t] : fallback);

      const getActualValue = (cfg: { type: TRuleType; value: unknown; isValid: (v: any) => boolean; }) => {
        if (cfg.type === "array") {
          return cfg.isValid(cfg.value) ? cfg.value : getFallback("array");
        }
        if (cfg.type === "object") {
          return cfg.isValid(cfg.value) ? cfg.value : getFallback("object");
        }
        if (typeof cfg.value === cfg.type) {
          return cfg.isValid(cfg.value) ? cfg.value : getFallback(cfg.type);
        }
        return getFallback(cfg.type);
      };

      if (output) {
        if (typeof getValue === "function") {
          newItem[output as string] = getValue(value as any, getFallback(Array.isArray(value) ? "array" : "object"));
        } else {
          switch (type) {
            case "string":
              newItem[output as string] = getActualValue({
                type,
                value: value?.toString() ?? getFallback(type),
                isValid: (v) => typeof v === "string" && v.trim().length > 0,
              });
              break;
            case "number": {
              const num = Number(value);
              newItem[output as string] = getActualValue({
                type,
                value: (Number.isNaN(num) || (typeof value !== "number" && num === 0)) ? getFallback(type) : num,
                isValid: (v) => typeof v === "number" && Number.isFinite(v),
              });
              break;
            }
            case "boolean":
              newItem[output as string] = getActualValue({
                type,
                value: Boolean(value),
                isValid: (v) => typeof v === "boolean",
              });
              break;
            case "array":
              newItem[output as string] = getActualValue({
                type: "array",
                value,
                isValid: (v) => Array.isArray(v),
              });
              break;
            case "object":
              newItem[output as string] = getActualValue({
                type: Array.isArray(value) ? "array" as const : "object",
                value,
                isValid: (v) => v !== null && typeof v === "object" && !Array.isArray(v),
              });
              break;
            default:
              newItem[output as string] = value;
          }
        }
      }
    } else {
      newItem[key] = value;
    }
  });

  return newItem as TOutput & Partial<TInput>;
};
