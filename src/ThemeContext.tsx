// ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme?: () => void;
  setSurpriseTheme?: () => void;
  isSparkling: boolean; // New state to track if the sparkle effect is active
  setSparkling: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setSurpriseTheme: () => {},
  isSparkling: false,
  setSparkling: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSparkling, setSparkling] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isSparkling) {
      createSparkles(20); // Create 20 sparkles
      timeoutId = setTimeout(() => {
        setSparkling(false); // Turn off sparkles after 3000ms
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [isSparkling]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const createSparkles = (count: number) => {
    const sparkleArea = document.querySelector(".sparkling-area");
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      if (sparkleArea) sparkleArea.appendChild(sparkle);
    }
  };

  const setSurpriseTheme = () => {
    if (theme === "surprise") {
      setSparkling(true);
      setTimeout(() => {
        setTheme("light");
        setSparkling(false);
        document.querySelectorAll(".sparkle").forEach(element => {
          element.parentNode?.removeChild(element);
        });
      }, 3000); // Duration for the sparkle effect before switching theme
    } else {
      setSparkling(true);
      setTimeout(() => {
        setTheme("surprise");
        setSparkling(false);
        document.querySelectorAll(".sparkle").forEach(element => {
          element.parentNode?.removeChild(element);
        });
      }, 3000); // Duration for the sparkle effect before switching theme
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setSurpriseTheme,
        isSparkling,
        setSparkling,
      }}
    >
      <div data-theme={theme}>
        <div
          className={`${isSparkling ? "sparkling-area sparkling" : ""}`}
        ></div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
