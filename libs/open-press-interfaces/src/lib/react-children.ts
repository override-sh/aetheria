import { ReactNode } from "react";

export interface ReactChildren {
	children: ReactNode | JSX.Element;
}

export type PartialReactChildren = Partial<ReactChildren>;