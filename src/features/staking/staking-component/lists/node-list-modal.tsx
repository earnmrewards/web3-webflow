import { CloseIcon } from "@/assets/icons/close";
import { useModal } from "@/contexts/use-modal";
import { useEffect } from "react";
import { nftCollectionUrl } from "../../config";

const nodes = [...new Array(35)].map((_, index) => ({ id: index }));

export function NodeListModal() {
  const { isOpen, setIsOpen } = useModal();

  useEffect(() => {
    if (!isOpen) return;

    window.scrollTo(0, 0);
  }, [isOpen]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;

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

  return (
    <div
      data-open={isOpen}
      className="flex items-center justify-center absolute top-0 left-0 w-screen h-screen overflow-hidden bg-black/40 opacity-0 data-[open=true]:opacity-100 invisible data-[open=true]:visible duration-150"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col bg-white rounded-3xl p-6 min-w-48 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-galano text-2xl text-black font-medium">
            Smart Nodes List
          </h3>
          <CloseIcon onClick={handleCloseModal} />
        </div>
        <div className="flex flex-wrap gap-4 border border-[#C5C5C5] p-2 rounded-2xl overflow-y-auto custom-scrollbar max-h-64 w-[486px]">
          {nodes.map(({ id }) => (
            <a
              key={id}
              className="border border-black rounded-2xl p-3 flex flex-col min-w-16 cursor-pointer"
              href={`${nftCollectionUrl}/${id}`}
              target="_blank"
              onClick={handleCloseModal}
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
