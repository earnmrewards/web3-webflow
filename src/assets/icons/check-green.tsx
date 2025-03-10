import { ComponentProps } from "react";

export function CheckGreen(props: ComponentProps<"svg">) {
  return (
    <svg
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.98242 7.42062L7.19667 12.6349L17.9824 1.84912"
        stroke="#00D632"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
