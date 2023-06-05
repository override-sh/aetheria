import { Component } from "grapesjs";

export interface ComponentAttributeChangeHandlerOptions {
	init?: boolean;
	stop_propagation?: boolean;
	idUpdate?: boolean;
}

export type ComponentAttributeChangeHandler = (
	component: Component,
	value: string,
	options: ComponentAttributeChangeHandlerOptions,
) => void;
