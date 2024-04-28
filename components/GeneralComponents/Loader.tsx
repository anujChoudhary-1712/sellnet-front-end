export default function Loader({
  color,
  size,
}: {
  color?: string;
  size?: string;
}) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${
          size ? `h-${size} w-${size}` : "h-12 w-12"
        } border-b-2 ${color ? `border-${color}` : "border-gray-900"}`}
      ></div>
    </div>
  );
}
