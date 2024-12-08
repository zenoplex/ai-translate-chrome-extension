declare global {
  interface Window {
    /**
     * @see https://developer.chrome.com/docs/ai/language-detection
     */
    translation: {
      canDetect: () => Promise<'no' | 'readily' | 'after-download'>;
      createDetector: () => Promise<LanguageDetector>;
    };
  }
}

export {};
