import { CloseIcon } from "@/assets/icons/close";
import { useModal } from "@/contexts/use-modal";
import { useEffect, useMemo, useState } from "react";
import { MAX_ITEMS_PER_PAGE } from "../../config";
import { createPortal } from "react-dom";
import { useHistory } from "@/hooks/staking/use-history";

interface NodeListModalProps {
  page: number;
}

export function NodeListModal({ page }: NodeListModalProps) {
  const { isOpen, setIsOpen, selectedHash } = useModal();
  const [component, setComponent] = useState<HTMLElement | null>(null);

  const { data } = useHistory({ page, take: MAX_ITEMS_PER_PAGE });

  const getHistoryItem = useMemo(() => {
    if (!data || !selectedHash) return [];

    const selectedItem = data.history.find(({ actionHash }) => actionHash === selectedHash);
    if (!selectedItem) return [];

    return selectedItem.smartNodeIds;
  }, [data, selectedHash]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

    setComponent(body);

    if (isOpen && !body.classList.contains("stop-scrolling")) {
      body.classList.add("stop-scrolling");
    }

    if (!isOpen && body.classList.contains("stop-scrolling")) {
      body.classList.remove("stop-scrolling");
    }
  }, [isOpen]);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    handleCloseModal();
  }

  if (!component) return null;

  return createPortal(
    <div
      data-open={isOpen}
      data-testid="modal-background"
      className="z-50 flex items-center justify-center fixed inset-0 w-screen h-screen overflow-hidden bg-black/40 opacity-0 data-[open=true]:opacity-100 invisible data-[open=true]:visible duration-150"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col bg-white rounded-3xl p-6 min-w-48 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-galano text-2xl text-black font-medium">
            Smart Nodes List
          </h3>
          <CloseIcon
            data-testid="close-icon"
            onClick={handleCloseModal}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap gap-4 border border-[#C5C5C5] p-2 rounded-2xl overflow-y-auto custom-scrollbar max-h-64 w-[246px] md:w-[486px]">
          {getHistoryItem.map((id) => (
            <div
              key={id}
              className="border border-black rounded-2xl p-3 flex flex-col min-w-16"
            >
              <span
                className="text-block-24 font-galano"
                style={{ color: "black" }}
              >
                ID
              </span>
              <span className="heading-text-table text-black font-bold">
                {id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    component
  );
}
