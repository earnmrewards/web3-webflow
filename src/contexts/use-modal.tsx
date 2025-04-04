import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedHash: string | undefined;
  setSelectedHash: Dispatch<SetStateAction<string | undefined>>;
}

const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHash, setSelectedHash] = useState<string | undefined>();

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, selectedHash, setSelectedHash }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
