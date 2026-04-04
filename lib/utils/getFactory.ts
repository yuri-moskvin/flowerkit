import type { Plugin } from "rollup";

type TPluginFactory = (options?: unknown) => Plugin;

/**
 * Gets `rollup` plugin's factory
 * @returns {TPluginFactory}
 */
export function getFactory(mod: unknown): TPluginFactory {
  const candidate = (mod as { default?: unknown; }).default ?? mod;
  return candidate as TPluginFactory;
}
