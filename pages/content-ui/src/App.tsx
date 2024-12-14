import { PopoverContent } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { translatedSelectionStorage } from '@extension/storage';
import { usePopper } from 'react-popper';
import { useEffect, useState } from 'react';

export default function App() {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [refElement, setRefElement] = useState<HTMLDivElement | null>(null);

  const translatedSelection = useStorage(translatedSelectionStorage);

  const { styles, attributes } = usePopper(refElement, popperElement, {
    placement: 'top',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  useEffect(() => {
    if (!translatedSelection?.rect) return;

    const refElement = document.createElement('div');
    refElement.style.position = 'absolute';
    refElement.style.top = `${translatedSelection.rect.top + window.scrollY}px`;
    refElement.style.left = `${translatedSelection.rect.left + window.scrollX}px`;
    refElement.style.width = `${translatedSelection.rect.width}px`;
    refElement.style.height = `${translatedSelection.rect.height}px`;
    document.body.append(refElement);

    setRefElement(refElement);

    return () => {
      refElement.remove();
      setRefElement(null);
    };
  }, [translatedSelection.rect]);

  return translatedSelection.text ? (
    <div ref={setPopperElement} className="max-w-xl" style={styles.popper} {...attributes.popper}>
      <PopoverContent content={translatedSelection.text} />
    </div>
  ) : null;
}
