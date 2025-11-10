import * as migration_20251106_133714 from './20251106_133714';
import * as migration_20251107_140325 from './20251107_140325';

export const migrations = [
  {
    up: migration_20251106_133714.up,
    down: migration_20251106_133714.down,
    name: '20251106_133714',
  },
  {
    up: migration_20251107_140325.up,
    down: migration_20251107_140325.down,
    name: '20251107_140325'
  },
];
