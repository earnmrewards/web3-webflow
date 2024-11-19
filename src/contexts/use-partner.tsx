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
  getPartnerId: () => string | null;
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

  function getPartnerId() {
    const { pathname } = window.location;
    const [partnerId] = pathname.split("/").filter((path) => path.length > 0);

    // return partnerId;
    return "wilstage-smartnodes-sale";
  }

  useEffect(() => {
    const partnerId = getPartnerId();
    if (!partnerId) return;

    setLoading(true);
    fetchPartnerData(partnerId);
  }, [fetchPartnerData]);

  const value: PartnerContextProps = {
    loading,
    data: partnerData,
    getPartnerId,
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
}

export function usePartner() {
  return useContext(PartnerContext);
}
