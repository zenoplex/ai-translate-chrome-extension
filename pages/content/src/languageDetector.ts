import { type FeatureError, FeatureNotAvailableError } from './errors';
import type { LanguageDetector } from './type';

type Create = () => Promise<LanguageDetector | FeatureError>;

export const create: Create = async () => {
  if (!('translation' in self && 'canDetect' in self.translation))
    return new FeatureNotAvailableError('Language detection is not available.');

  const { translation } = self;
  const canDetect = await translation.canDetect();

  let detector;
  if (canDetect === 'no') {
    return new FeatureNotAvailableError('Language detection is not available.');
  }
  if (canDetect === 'readily') {
    detector = await translation.createDetector();
  } else {
    detector = await translation.createDetector();
    await detector.ready;
  }

  return detector;
};
