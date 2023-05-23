import Panel from "@grapesjs/panels/model/Panel";

export const ResizableLayersPanel: Panel = {
	id: "layers",
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	el: ".panel__right",
	// Make the panel resizable
	resizable: {
		maxDim: 400,
		minDim: 300,
		tc:     0, // Top handler
		cl:     1, // Left handler
		cr:     0, // Right handler
		bc:     0, // Bottom handler
		// Being a flex child we need to change `flex-basis` property
		// instead of the `width` (default)
		keyWidth: "width",
	},
};