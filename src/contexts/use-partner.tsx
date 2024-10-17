import { getPartnerData } from "@/actions/get-partner-data";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type PartnerData = Awaited<ReturnType<typeof getPartnerData>>;

interface PartnerContextProps {
  loading: boolean;
  data: PartnerData | null;
}

const PartnerContext = createContext({} as PartnerContextProps);

interface PartnerProviderProps {
  children: ReactNode;
}

export function PartnerProvider({ children }: PartnerProviderProps) {
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPartnerData = useCallback(async (partnerId: string) => {
    const data = await getPartnerData(partnerId);
    setPartnerData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const { pathname } = window.location;
    const [partnerId] = pathname.split("/").filter((path) => path.length > 0);
    if (!partnerId) return;

    setLoading(true);
    fetchPartnerData("CODE_123");
  }, [fetchPartnerData]);

  const value: PartnerContextProps = {
    loading,
    data: partnerData,
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
}

export function usePartner() {
  return useContext(PartnerContext);
}
