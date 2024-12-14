import { debounce, getAbsolutePosition } from './utils';
import { create as createDetector } from './languageDetector';
import { create as createTranslator } from './languageTranslator';
import { targetLanguageStorage, translatedSelectionStorage } from '@extension/storage';
import { FeatureNotAvailableError } from './errors';

const main = async () => {
  const detector = await createDetector();
  if (detector instanceof FeatureNotAvailableError) {
    console.error(detector.message, detector.cause);
    return;
  }

  const selectionChangeHandler = async () => {
    const selection = document.getSelection();
    if (!selection || selection.toString() === '') {
      await translatedSelectionStorage.deleteTranslatedSelection();
      return;
    }

    const results = await detector.detect(selection.toString());
    if (results.length < 1) return;

    const targetLanguage = await targetLanguageStorage.get();
    const sourceLanguage = results[0].detectedLanguage;
    if (sourceLanguage === targetLanguage) return;

    const translator = await createTranslator({ sourceLanguage, targetLanguage });
    if (translator instanceof FeatureNotAvailableError) {
      console.error(translator.message, translator.cause);
      return;
    }
    const result = await translator.translate(selection.toString());

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const position = getAbsolutePosition(rect, { x: window.scrollX, y: window.scrollY });
    await translatedSelectionStorage.setTranslatedSelection({ text: result, rect: position });

    // Calculate position for popover
    const popoverX = rect.right + window.scrollX;
    const popoverY = rect.bottom + window.scrollY;

    const popover = document.createElement('div');
    popover.style.position = 'absolute';
    popover.style.top = `${popoverY}px`;
    popover.style.left = `${popoverX}px`;
    popover.style.backgroundColor = 'red';
    popover.textContent = result;
    document.body.appendChild(popover);

    translator.destroy();
  };

  document.addEventListener('selectionchange', debounce(selectionChangeHandler));
};

main();
