import { ComponentProps } from "react";

type Props = {
  state: "correct" | "exist" | "wrong" | null;
  scale?: number;
} & Omit<ComponentProps<"button">, "className" | "style">;

export default function KeyboardButton(props: Props) {
  let color = "bg-gray-300 text-gray-900 dark:bg-gray-500 dark:text-gray-200";
  switch (props.state) {
    case "correct":
      color = "bg-green-700";
      break;
    case "exist":
      color = "bg-yellow-600";
      break;
    case "wrong":
      color = "text-white bg-gray-500 dark:text-gray-200 dark:bg-gray-700";
      break;
    default:
  }

  return (
    <button
      className={`rounded-md uppercase font-semibold text-sm flex items-center justify-center ${color}`}
      style={{ minHeight: 48, flex: props.scale ?? 1 }}
      {...props}
    />
  );
}
