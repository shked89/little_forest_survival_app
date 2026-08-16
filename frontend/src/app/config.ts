const TRUE_ENV_VALUES = new Set(['1', 'true', 'yes', 'on'])

export const env = (name: string): unknown => import.meta.env?.[name]

export const envBoolean = (name: string, fallback = false): boolean => {
  const value = env(name)

  if (value === undefined || value === null || value === '') return fallback

  return TRUE_ENV_VALUES.has(String(value).trim().toLowerCase())
}

export const CONFIG = {
  DEV_MODE: envBoolean('VITE_DEV_MODE'),
} as const
