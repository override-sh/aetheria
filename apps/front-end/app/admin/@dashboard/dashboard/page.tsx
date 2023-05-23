"use client";

import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor } from "grapesjs";
import { useEffect, useState } from "react";

import "./editor.css";
import { BaseBlocksPlugin } from "@override/gjs-base-blocks";
import { UiPlugin } from "@override/gjs-ui";

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
						height:          "100vh",
						width:           "auto",
						plugins:         [
							UiPlugin,
							BaseBlocksPlugin,
						],
						canvas:          {
							scripts: [
								"https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp",
							],
							styles:  [
								"https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css",
							],
						},
						panels:          {
							defaults: [
								{
									id:      "panel-devices",
									el:      ".panel__devices",
									buttons: [
										{
											id:        "device-desktop",
											label:     "D",
											command:   "set-device-desktop",
											active:    true,
											togglable: false,
										},
										{
											id:        "device-mobile",
											label:     "M",
											command:   "set-device-mobile",
											togglable: false,
										},
									],
								},
							],
						},
						blockManager:    {
							appendTo: "#blocks",
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
						deviceManager:   {
							devices: [
								{
									name:  "Desktop",
									width: "", // default size
								},
								{
									name:       "Mobile",
									width:      "320px", // this value will be used on canvas width
									widthMedia: "480px", // this value will be used in CSS @media
								},
							],
						},
						styleManager:    {
							appendTo: ".styles-container",
							sectors:  [
								{
									name: "Dimension",
									open: false,
									// Use built-in properties
									buildProps: [
										"width",
										"min-height",
										"padding",
									],
									// Use `properties` to define/override single property
									properties: [
										{
											// Type of the input,
											// options: integer | radio | select | color | slider | file | composite |
											// stack
											type:     "integer",
											name:     "The width", // Label for the property
											property: "width", // CSS property (if buildProps contains it will be
											                   // extended)
											units:    [
												"px",
												"%",
											], // Units, available only for 'integer' types
											defaults: "auto", // Default value
											min:      0, // Min value, available only for 'integer' types
										},
									],
								},
								{
									name:       "Extra",
									open:       false,
									buildProps: [
										"background-color",
										"box-shadow",
										"custom-prop",
									],
									properties: [
										{
											id:       "custom-prop",
											name:     "Custom Label",
											property: "font-size",
											type:     "select",
											defaults: "32px",
											// List of options, available only for 'select' and 'radio'  types
											options: [
												{
													value: "12px",
													name:  "Tiny",
												},
												{
													value: "18px",
													name:  "Medium",
												},
												{
													value: "32px",
													name:  "Big",
												},
											],
										},
									],
								},
							],
						},
					}),
				);
			}
		},
		[editor],
	);

	if (editor) {
		// ...
		editor.Commands.add("show-layers", {
			getRowEl(editor) {
				return editor.getContainer()
				             .closest(".editor-row");
			},
			getLayersEl(row) { return row.querySelector(".layers-container"); },

			run(
				editor,
				sender,
			) {
				const lmEl = this.getLayersEl(this.getRowEl(editor));
				lmEl.style.display = "";
			},
			stop(
				editor,
				sender,
			) {
				const lmEl = this.getLayersEl(this.getRowEl(editor));
				lmEl.style.display = "none";
			},
		});
		editor.Commands.add("show-styles", {
			getRowEl(editor) {
				return editor.getContainer()
				             .closest(".editor-row");
			},
			getStyleEl(row) { return row.querySelector(".styles-container"); },

			run(
				editor,
				sender,
			) {
				const smEl = this.getStyleEl(this.getRowEl(editor));
				smEl.style.display = "";
			},
			stop(
				editor,
				sender,
			) {
				const smEl = this.getStyleEl(this.getRowEl(editor));
				smEl.style.display = "none";
			},
		});
		editor.Commands.add("show-traits", {
			getTraitsEl(editor) {
				const row = editor.getContainer()
				                  .closest(".editor-row");
				return row.querySelector(".traits-container");
			},
			run(
				editor,
				sender,
			) {
				this.getTraitsEl(editor).style.display = "";
			},
			stop(
				editor,
				sender,
			) {
				this.getTraitsEl(editor).style.display = "none";
			},
		});
		editor.Commands.add("set-device-desktop", {
			run: editor => editor.setDevice("Desktop"),
		});
		editor.Commands.add("set-device-mobile", {
			run: editor => editor.setDevice("Mobile"),
		});
	}

	return (
		<div className={"relative h-screen w-full"}>
			<div className="panel__top">
				<div className="panel__basic-actions"></div>
				<div className="panel__devices"></div>
				<div className="panel__switcher"></div>
			</div>
			<div className="editor-row">
				<div className="editor-canvas">
					<div id="gjs">...</div>
				</div>
				<div className="panel__right">
					<div className="layers-container"></div>
					<div className="styles-container"></div>
					<div className="traits-container"></div>
				</div>
			</div>
			<div id="blocks"></div>
		</div>
	);
}
