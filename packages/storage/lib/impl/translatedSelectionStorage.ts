import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type Translated = {
  text: string;
  // Cannot save DOMRect directly to storage
  rect: Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height' | 'x' | 'y'>;
};

type TranslatedSelection = BaseStorage<Translated | null> & {
  setTranslatedSelection: (value: Translated) => Promise<void>;
};

const storage = createStorage<Translated | null>('translated-selection-storage-key', null, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const translatedSelectionStorage: TranslatedSelection = {
  ...storage,
  setTranslatedSelection: async (value: Translated) => {
    await storage.set(value);
  },
};
