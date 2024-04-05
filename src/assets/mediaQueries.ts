/* eslint-disable react-hooks/rules-of-hooks */
import { useMediaQuery } from "react-responsive";

export const is2Xl = useMediaQuery({ query: "(min-width: 1536px)" });
export const isXl = useMediaQuery({ query: "(min-width: 1280px)" });
export const isLg = useMediaQuery({ query: "(min-width: 1024px)" });
export const isMd = useMediaQuery({ query: "(min-width: 768px)" });
export const isSm = useMediaQuery({ query: "(min-width: 640px)" });
