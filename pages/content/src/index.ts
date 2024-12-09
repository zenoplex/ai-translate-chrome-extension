import { debounce } from './utils';
import { create as createDetector } from './languageDetector';
import { create as createTranslator } from './languageTranslator';

const main = async () => {
  // TODO: Error handling
  const detector = await createDetector();

  const selectionChangeHandler = async () => {
    const selection = document.getSelection();
    if (!selection) return;

    const results = await detector.detect(selection.toString());
    if (results.length < 1) return;

    // TODO: target language should be configurable
    const targetLanguage = 'ja';
    const sourceLanguage = results[0].detectedLanguage;
    if (sourceLanguage === targetLanguage) return;

    const translator = await createTranslator({ sourceLanguage, targetLanguage });
    const result = await translator.translate(selection.toString());
    console.log(result);

    translator.destroy();
  };

  document.addEventListener('selectionchange', debounce(selectionChangeHandler));
};

main();
