import { ComponentProps } from "react";

export function CloseIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.8457 3.57275L15.8396 15.5666M3.8457 15.5669L15.8396 3.57298"
        stroke="black"
        strokeWidth="3.08398"
        strokeLinecap="round"
      />
    </svg>
  );
}
