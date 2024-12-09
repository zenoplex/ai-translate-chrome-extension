declare global {
  interface Window {
    /**
     * @see https://developer.chrome.com/docs/ai/language-detection
     */
    translation: {
      canDetect: () => Promise<'no' | 'readily' | 'after-download'>;
      createDetector: () => Promise<LanguageDetector>;
      canTranslate: ({
        sourceLanguage: string,
        targetLanguage: string,
      }) => Promise<'no' | 'readily' | 'after-download'>;
      createTranslator: ({ sourceLanguage: string, targetLanguage: string }) => Promise<LanguageTranslator>;
    };
  }
}

export {};
