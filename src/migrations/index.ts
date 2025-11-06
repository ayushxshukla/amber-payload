import * as migration_20251106_133714 from './20251106_133714'

export const migrations = [
  {
    up: migration_20251106_133714.up,
    down: migration_20251106_133714.down,
    name: '20251106_133714',
  },
]
