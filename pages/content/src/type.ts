export interface LanguageDetector {
  detect: (str: string) => Promise<{ detectedLanguage: string; confidence: number }[]>;
  /**
   * According to the document it exists when canDetect returns after-download.
   * However, I couldn't find any code that assigns a value to this property.
   */
  ready: Promise<void>;
}
