import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { targetLanguageStorage } from '@extension/storage';

// Supported language pairs are limited.
// https://developer.chrome.com/docs/ai/translator-api#supported-languages

const options = [
  { label: 'English', value: 'en' },
  { label: 'Mandarin', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Spanish', value: 'es' },
  { label: 'Turkish', value: 'tr' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Vietnamese', value: 'vi' },
  { label: 'Bengali', value: 'bn' },
];

const Popup = () => {
  const targetLanguage = useStorage(targetLanguageStorage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    targetLanguageStorage.setTargetLanguage(event.currentTarget.value);
  };

  return (
    <div className="p-4">
      <form>
        <label className="form-control w-full" htmlFor="select">
          <div className="label">
            <span className="label-text">Translation target language</span>
          </div>
          <select className="select select-bordered" id="select" value={targetLanguage} onChange={handleChange}>
            {options.map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
