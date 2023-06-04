import { Editor } from "grapesjs";
import { makeBlockLabel } from "./label-factory";

export const ImageBlock = (editor: Editor) => {
	editor.Blocks.add("image", {
		label:    makeBlockLabel("Image", "photo"),
		category: "Basic",
		content:  {
			type:       "image",
			attributes: {
				src: "https://placehold.co/600x400",
			},
			style:      {
				width:  "600px",
				height: "400px",
			},
		},
	});
};