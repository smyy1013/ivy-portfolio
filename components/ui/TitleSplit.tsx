/**
 * Renders a title with its last word in hollow lettering:
 * "What I Build" becomes WHAT I + outlined BUILD.
 */
export function TitleSplit({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  // A one-word title stays solid so it can still be read.
  if (words.length < 2) return <>{text}</>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-outline">{last}</span>
    </>
  );
}
