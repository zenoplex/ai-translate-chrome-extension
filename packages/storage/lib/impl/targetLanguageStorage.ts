import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type TargetLanguage = string;

type TargetLanguageStorage = BaseStorage<TargetLanguage> & {
  setTargetLanguage: (value: TargetLanguage) => Promise<void>;
};

const storage = createStorage<TargetLanguage>('target-language-storage-key', 'ja', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const targetLanguageStorage: TargetLanguageStorage = {
  ...storage,
  setTargetLanguage: async (value: TargetLanguage) => {
    await storage.set(value);
  },
};
