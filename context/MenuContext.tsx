'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MenuContextType = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
            {children}
        </MenuContext.Provider>
    );
};
