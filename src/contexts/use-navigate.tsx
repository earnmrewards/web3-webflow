import { createContext, ReactNode, useContext, useState } from "react";

interface NavigateProps {
  path?: string;
  query?: URLSearchParams;
}

interface NavigateContextProps {
  searchParams: URLSearchParams;
  navigate: (props: NavigateProps) => void;
  back: () => void;
}

const NavigateContext = createContext({} as NavigateContextProps);

interface NavigateProviderProps {
  children: ReactNode;
}

export function NavigateProvider({ children }: NavigateProviderProps) {
  const [url, setUrl] = useState(new URL(window.location.href));

  function navigateTo(url: URL, reload: boolean) {
    if (reload) {
      window.location.href = url.toString();
      return;
    }

    window.history.pushState(null, "", url.toString());
  }

  function back() {
    window.history.back();

    window.addEventListener(
      "popstate",
      () => {
        setUrl(new URL(window.location.href));
      },
      { once: true }
    );
  }

  function navigate({ path, query }: NavigateProps) {
    const newUrl = new URL(url.href);

    if (path) newUrl.pathname = path;
    if (!query) {
      setUrl(newUrl);
      navigateTo(newUrl, !!path);
      return;
    }

    if (query.size !== 0) {
      query.forEach((value, key) => {
        newUrl.searchParams.set(key, value);
      });
    } else {
      newUrl.search = "";
    }

    setUrl(newUrl);
    navigateTo(newUrl, !!path);
  }

  const value: NavigateContextProps = {
    searchParams: url.searchParams,
    navigate,
    back,
  };

  return (
    <NavigateContext.Provider value={value}>
      {children}
    </NavigateContext.Provider>
  );
}

export function useNavigate() {
  return useContext(NavigateContext);
}
