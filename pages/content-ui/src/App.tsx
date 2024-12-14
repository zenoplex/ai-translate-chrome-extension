import { PopoverContent } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { translatedSelectionStorage } from '@extension/storage';

export default function App() {
  const v = useStorage(translatedSelectionStorage);

  return v?.rect ? (
    <div style={{ userSelect: 'none', position: 'absolute', left: v.rect.x, top: v.rect.y }}>
      <PopoverContent content={v.text} />
    </div>
  ) : null;
}
