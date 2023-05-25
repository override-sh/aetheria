"use client";

import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import { useEffect, useState } from "react";

import "./editor.css";
import { BaseBlocksPlugin } from "@override/gjs-base-blocks";
import { UiPlugin } from "@override/gjs-ui";
import { useDraggableElement } from "@override/open-press-hooks";

export default function Dashboard(): JSX.Element {
	const [editor, set_editor] = useState<Editor | null>(null);

	useEffect(
		() => {
			if (!editor) {
				set_editor(
					grapesjs.init({
						// Indicate where to init the editor. You can also pass an HTMLElement
						container:   "#gjs",
						fromElement: true,
						// Size of the editor
						height:       "calc(100vh - 3rem)", // full page - .panel__top, if the second changes, this
						                                    // should change too
						width:        "auto",
						plugins:      [
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							UiPlugin,
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							BaseBlocksPlugin,
						],
						canvas:       {
							scripts: [
								"https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp",
							],
							styles:  [
								"https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css",
							],
						},
						blockManager: {
							appendTo: ".blocks-container",
						},
						layerManager:    {
							appendTo: ".layers-container",
						},
						selectorManager: {
							appendTo: ".styles-container",
						},
						traitManager:    {
							appendTo: ".traits-container",
						},
						styleManager:    {
							appendTo: ".styles-container",
						},
					}),
				);
			}
		},
		[editor],
	);

	useDraggableElement(".sp-palette-container", true);

	return (
		<div className={"editor"}>
			<div className={"panel__top"}>
				<div className={"panel__basic-actions"}></div>
				<div className={"panel__devices"}></div>
				<div className={"panel__switcher"}></div>
			</div>
			<div className={"editor-row"}>
				<div className={"editor-canvas"}>
					<div id={"gjs"}></div>
				</div>
				<div className={"panel__right"}>
					<div
						className={"layers-container"}
						style={{ display: "none" }}
					></div>
					<div
						className={"styles-container"}
						style={{ display: "none" }}
					></div>
					<div
						className={"traits-container"}
						style={{ display: "none" }}
					></div>
					<div className={"blocks-container"}></div>
				</div>
			</div>
		</div>
	);
}
