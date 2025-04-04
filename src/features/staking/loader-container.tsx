import { useStake } from "@/contexts/staking/use-stake";
import { useEffect } from "react";
import { LOADER_CONTAINER_ID, SPINNER_COMPONENT_ID } from "../global-config";

export function LoaderContainer() {
  const { finished, loading } = useStake();

  function showLoaderBackground() {
    const container = document.getElementById(LOADER_CONTAINER_ID);
    if (!container) return;

    const shouldShow =
      finished || (!finished && loading) || (finished && loading);
    container.style.display = shouldShow ? "flex" : "none";
  }
  useEffect(showLoaderBackground, [finished, loading]);

  function showSpinner() {
    const spinner = document.getElementById(
      SPINNER_COMPONENT_ID
    ) as HTMLImageElement;
    if (!spinner) return;

    const animateClassName = "animate-spin";
    if (!spinner.classList.contains(animateClassName)) {
      spinner.classList.add(animateClassName);
    }

    const shouldShowSpinner = loading && !finished;
    spinner.style.display = shouldShowSpinner ? "block" : "none";
  }
  useEffect(showSpinner, [loading, finished]);

  return null;
}
