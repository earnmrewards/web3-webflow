import { useHeldNodes } from "@/hooks/staking/use-held-nodes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MAX_ITEMS_PER_PAGE,
  MAX_VISIBLE_PAGES,
  STAKING_PAGINATION_COMPONENT_ID,
} from "../config";
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
  const [lastPage, setLastPage] = useState(1);

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

  useEffect(() => {
    if (!selectedNodes || selectedNodes.lastPage === 0) return;

    setLastPage(selectedNodes.lastPage);
  }, [selectedNodes]);

  if (!paginationComponent) return null;

  function getVisiblePages() {
    const totalPages = lastPage;
    const halfVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);

    let startPage = Math.max(page - halfVisiblePages, 1);
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    if (endPage === totalPages) {
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  function handlePageChange(type: "prev" | "next") {
    if (!selectedNodes) return;

    if (type === "prev") {
      setPage(page - 1 <= 0 ? page : page - 1);
      return;
    }

    setPage(page + 1 > selectedNodes.lastPage ? page : page + 1);
  }

  function handlePageClick(page: number) {
    setPage(page);
  }

  return createPortal(
    <div className="w-full flex flex-col md:flex-row items-center justify-center p-2 gap-2">
      <a
        data-disabled={page === 1}
        className={`border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-white font-galano cursor-pointer data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50`}
        onClick={() => handlePageChange("prev")}
      >
        {`< Back`}
      </a>
      {page > 3 && (
        <>
          <a
            data-active={page === 1}
            className="rounded-full border border-[#C5C5C5] px-4 py-2 font-galano cursor-pointer text-white bg-transparent data-[active=true]:bg-[#00D632] data-[active=true]:text-black data-[active=true]:border-[#00D632]"
            onClick={() => handlePageClick(1)}
          >
            1
          </a>
          <span className="text-white/50 px-2">...</span>
        </>
      )}

      {getVisiblePages().map((pageNum) => (
        <a
          key={pageNum}
          data-active={page === pageNum}
          className="rounded-full border border-[#C5C5C5] px-4 py-2 font-galano cursor-pointer text-white bg-transparent data-[active=true]:bg-[#00D632] data-[active=true]:text-black data-[active=true]:border-[#00D632]"
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </a>
      ))}

      {page < lastPage - 2 && (
        <>
          <span className="text-white/50 px-2">...</span>
          <a
            data-active={page === lastPage}
            className="rounded-full border border-[#C5C5C5] px-4 py-2 font-galano cursor-pointer text-white bg-transparent data-[active=true]:bg-[#00D632] data-[active=true]:text-black data-[active=true]:border-[#00D632]"
            onClick={() => handlePageClick(lastPage)}
          >
            {lastPage}
          </a>
        </>
      )}

      <a
        data-disabled={page === lastPage}
        className="border border-[#C5C5C5] rounded-full px-4 py-2 text-sm text-white font-galano cursor-pointer data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
        onClick={() => handlePageChange("next")}
      >
        {`Next >`}
      </a>
    </div>,
    paginationComponent
  );
}
