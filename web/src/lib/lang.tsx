"use client";

import { createContext, useContext } from "react";
import { DICT, type Lang, type Dict } from "./i18n";

interface LangCtx {
  lang: Lang;
  dir: "ltr";
  t: Dict;
  money: (n: number) => string;
}

const value: LangCtx = {
  lang: "en",
  dir: "ltr",
  t: DICT.en,
  money: (n: number) => `${DICT.en.currency} ${n.toLocaleString("en")}`,
};

const Ctx = createContext<LangCtx>(value);

export function LangProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
