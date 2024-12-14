import { PopoverContent } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { translatedSelectionStorage } from '@extension/storage';
import { usePopper } from 'react-popper';
import { useMemo, useState } from 'react';

export default function App() {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const translatedSelection = useStorage(translatedSelectionStorage);

  const reference = useMemo(() => {
    if (!translatedSelection?.rect) return null;
    return { getBoundingClientRect: () => DOMRect.fromRect(translatedSelection.rect) };
  }, [translatedSelection]);

  const { styles, attributes } = usePopper(reference, popperElement);

  return translatedSelection.text ? (
    <div ref={setPopperElement} style={{ ...styles.popper, backgroundColor: 'red' }} {...attributes.popper}>
      <PopoverContent content={translatedSelection.text} />
    </div>
  ) : null;
}
