import { atom } from "recoil";
import { IconType } from "react-icons/lib";
import { TiHome } from "react-icons/ti";

export interface DirectoryMenuItem {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}

interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem: DirectoryMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: defaultMenuState,
});
