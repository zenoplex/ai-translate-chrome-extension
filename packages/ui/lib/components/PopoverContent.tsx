interface Props {
  content?: string;
}

export const PopoverContent = ({ content }: Props) => {
  return (
    <div className="rounded-full border border-gray-200 bg-white px-4 py-2 drop-shadow-lg">
      <p>{content}</p>
    </div>
  );
};
