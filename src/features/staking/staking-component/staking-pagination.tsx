import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MAX_ITEMS_PER_PAGE, STAKING_PAGINATION_COMPONENT_ID } from "../config";
import { useStakedNodes } from "@/hooks/staking/use-staked-nodes";
import { StakeOption } from "./types";
import { createPortal } from "react-dom";

interface StakingPaginationProps {
  stakeOption: StakeOption;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function StakingPagination({
  stakeOption,
  page,
  setPage,
}: StakingPaginationProps) {
  const [paginationComponent, setPaginationComponent] =
    useState<HTMLElement | null>(null);

  const { data: heldNodes } = useHeldNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });
  const { data: stakedNodes } = useStakedNodes({
    page,
    take: MAX_ITEMS_PER_PAGE,
  });

  const selectedNodes = stakeOption === "available" ? heldNodes : stakedNodes;

  useEffect(() => {
    const component = document.getElementById(STAKING_PAGINATION_COMPONENT_ID);
    if (!component) return;

    setPaginationComponent(component as HTMLElement);
  }, []);

  if (!paginationComponent) return null;

  function handlePageChange(type: "prev" | "next") {
    if (!selectedNodes) return;

    if (type === "prev") {
      setPage(page - 1 <= 0 ? page : page - 1);
      return;
    }

    setPage(page + 1 > selectedNodes.lastPage ? page : page + 1);
  }

  return createPortal(
    <>
      <a
        className="border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-white font-galano cursor-pointer"
        onClick={() => handlePageChange("prev")}
      >
        {`< Back`}
      </a>
      {new Array(selectedNodes?.lastPage || 1).fill(0).map((_, index) => (
        <a
          key={index}
          className="rounded-full border border-[#C5C5C5] px-4 py-2 font-galano cursor-pointer"
          style={{
            backgroundColor: page === index + 1 ? "#00D632" : "transparent",
            color: page === index + 1 ? "black" : "white",
            borderColor: page === index + 1 ? "#00D632" : "white",
          }}
        >
          {index + 1}
        </a>
      ))}
      <a
        className="border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-white font-galano cursor-pointer"
        onClick={() => handlePageChange("next")}
      >
        {`Next >`}
      </a>
    </>,
    paginationComponent
  );
}
