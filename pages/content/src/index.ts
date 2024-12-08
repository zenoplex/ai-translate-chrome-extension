import { debounce } from './utils';
import { create } from './languageDetector';
console.log('content script loaded');

const main = async () => {
  // TODO: Error handling
  const detector = await create();

  const selectionChangeHandler = async () => {
    const selection = document.getSelection();
    if (!selection) return;

    const results = await detector.detect(selection.toString());
    if (results.length < 1) return;

    console.log(results[0].detectedLanguage);
  };

  document.addEventListener('selectionchange', debounce(selectionChangeHandler));
};

main();
