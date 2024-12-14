import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type Translated =
  | {
      text: string;
      // Cannot save DOMRect directly to storage
      rect: Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height' | 'x' | 'y'>;
    }
  // Passing null to storage does not seem to trigger updates
  | { text: undefined; rect: undefined };

type TranslatedSelection = BaseStorage<Translated> & {
  setTranslatedSelection: (value: Translated) => Promise<void>;
  deleteTranslatedSelection: () => Promise<void>;
};

const storage = createStorage<Translated>(
  'translated-selection-storage-key',
  { text: undefined, rect: undefined },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

export const translatedSelectionStorage: TranslatedSelection = {
  ...storage,
  setTranslatedSelection: async (value: Translated) => {
    await storage.set(value);
  },
  deleteTranslatedSelection: async () => {
    await storage.set({ text: undefined, rect: undefined });
  },
};
