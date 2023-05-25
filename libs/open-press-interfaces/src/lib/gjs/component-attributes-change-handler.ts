import Component from "@grapesjs/dom_components/model/Component";

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
