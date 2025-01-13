import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Definir cores e propriedades do tema
export const lightTheme: Theme = {
  primary: '#FF6F00',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  border: 'rgba(0,0,0,0.1)',
  shadowColor: '#000000',
  text: {
    primary: '#000000',
    secondary: '#666666',
  },
  statusBar: 'dark',
  shadow: '#000000',
};

export const darkTheme: Theme = {
  primary: '#FF6F00',
  background: '#000000',
  surface: '#1C1C1E',
  border: 'rgba(255,255,255,0.1)',
  shadowColor: '#FFFFFF',
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
  },
  statusBar: 'light',
  shadow: '#FFFFFF',
};

export type Theme = {
  primary: string;
  background: string;
  surface: string;
  border: string;
  shadowColor: string;
  text: {
    primary: string;
    secondary: string;
  };
  statusBar: 'light' | 'dark';
  shadow: string;
};

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDark] = useState(false);

  // Carrega a preferência de tema salva na montagem
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Carrega o tema do AsyncStorage
  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

 //Salva preferência de tema
  const saveThemePreference = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Alterna a função do tema
  const toggleTheme = useCallback(() => {
    setIsDark(prevIsDark => {
      const newIsDark = !prevIsDark;
      saveThemePreference(newIsDark);
      return newIsDark;
    });
  }, []);

  // Obtém o tema atual com base no estado isDark
  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 