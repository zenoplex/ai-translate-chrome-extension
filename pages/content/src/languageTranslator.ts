import { type FeatureError, FeatureNotAvailableError } from './errors';
import type { LanguageTranslator } from './type';

type Create = (args: { sourceLanguage: string; targetLanguage: string }) => Promise<LanguageTranslator | FeatureError>;

export const create: Create = async ({ sourceLanguage, targetLanguage }) => {
  if (!('translation' in self && 'createTranslator' in self.translation))
    return new FeatureNotAvailableError('Language translator is not available.');

  const { translation } = self;
  const canDetect = await translation.canTranslate({ sourceLanguage, targetLanguage });

  let translator;
  if (canDetect === 'no') {
    return new FeatureNotAvailableError('Language translator is not available.');
  }
  if (canDetect === 'readily') {
    translator = await translation.createTranslator({ sourceLanguage, targetLanguage });
  } else {
    translator = await translation.createTranslator({ sourceLanguage, targetLanguage });
    await translator.ready;
  }

  return translator;
};
