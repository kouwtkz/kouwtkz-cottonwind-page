import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import MenuButton from "../components/svg/button/MenuButton";
import { create } from "zustand";
import { ThemeChangeButton } from "./ThemeSetter";
import { useCookies } from "react-cookie";
import { useManageState } from "./StateSet";
import SiteConfigList from "@/data/config.list";
type SiteMenuStateType = {
  isOpen: boolean;
  SetIsOpen: (isOpen: boolean) => void;
  ToggleIsOpen: () => void;
};
export const useSiteMenuState = create<SiteMenuStateType>((set) => ({
  isOpen: false,
  SetIsOpen: (isOpen) => {
    set(() => ({ isOpen }));
  },
  ToggleIsOpen: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

function SetSiteMenu({ nav }: { nav: SiteMenuItemType[] }) {
  const { SetIsOpen } = useSiteMenuState();
  const { visibleWorkers } = useManageState();
  const list = useMemo(() => {
    const list = nav.concat();
    if (visibleWorkers)
      list.push({ name: "workers", url: "/workers", out: true });
    return list;
  }, [nav, visibleWorkers]);
  return (
    <div className="siteMenu">
      {list.map((item, i) => {
        if (item.url) {
          if (item.out) {
            return (
              <a key={i} href={item.url} className="item">
                {item.short || item.name}
              </a>
            );
          } else {
            return (
              <Link
                key={i}
                to={item.url}
                className="item"
                onClick={() => {
                  setTimeout(() => {
                    SetIsOpen(false);
                  }, 350);
                }}
              >
                {item.short || item.name}
              </Link>
            );
          }
        } else {
          switch (item.switch) {
            case "theme":
              return (
                <ThemeChangeButton key={i} className="item theme">
                  {item.name}
                </ThemeChangeButton>
              );
          }
        }
      })}
    </div>
  );
}

export function SiteMenu() {
  const { isOpen } = useSiteMenuState();
  return (
    <>
      {SiteConfigList.nav ? (
        <div style={isOpen ? {} : { display: "none" }}>
          <SetSiteMenu nav={SiteConfigList.nav} />
        </div>
      ) : null}
    </>
  );
}

export function SiteMenuButton() {
  const { isOpen, ToggleIsOpen } = useSiteMenuState(
    ({ isOpen, ToggleIsOpen }) => ({ isOpen, ToggleIsOpen })
  );
  return (
    <MenuButton
      isOpen={isOpen}
      onClick={ToggleIsOpen}
      className="siteMenuButton"
    />
  );
}
