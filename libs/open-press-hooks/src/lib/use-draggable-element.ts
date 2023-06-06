"use client";

/* istanbul ignore file */

import { DragEvent, useCallback, useEffect, useState } from "react";
import { getCurrentEventSelector, getElementOffset, updateValueAtIndex } from "@open-press/utility";

export const useDraggableElement = (
	header_query_selector: string,
	move_parent: boolean,
	use_style = true,
) => {
	const [pos1, set_pos1] = useState<number[]>([]),
	      [pos2, set_pos2] = useState<number[]>([]),
	      [pos3, set_pos3] = useState<number[]>([]),
	      [pos4, set_pos4] = useState<number[]>([]);

	const [elements, set_elements] = useState<HTMLElement[]>();

	const [is_mouse_down, set_is_mouse_down] = useState<boolean>(false);

	const closeDragElement = () => {
		set_is_mouse_down(false);
	};

	const makeDragMouseDown = (elements: HTMLElement[]) => {
		return (e: Event) => {
			e.preventDefault();
			const event: DragEvent = e as unknown as DragEvent;

			if (!elements) {
				return;
			}

			const index = elements.indexOf(event.currentTarget as HTMLElement);

			// get the mouse cursor position at startup:
			set_is_mouse_down(true);
			set_pos3(updateValueAtIndex(pos3, index, event.clientX));
			set_pos4(updateValueAtIndex(pos4, index, event.clientY));
		};
	};

	const elementDrag = useCallback(
		(e: Event) => {
			e.preventDefault();
			const event: DragEvent = e as unknown as DragEvent;

			if (!elements) {
				return;
			}

			const current_selector = getCurrentEventSelector(e, header_query_selector);
			if (!current_selector) {
				return;
			}

			const index = elements.indexOf(current_selector);

			// calculate the new cursor position:
			set_pos1(updateValueAtIndex(pos1, index, pos3[index] - event.clientX));
			set_pos2(updateValueAtIndex(pos2, index, pos4[index] - event.clientY));
			set_pos3(updateValueAtIndex(pos3, index, event.clientX));
			set_pos4(updateValueAtIndex(pos4, index, event.clientY));

			let current_element = elements[index];

			// set the element's new position:
			if (current_element) {
				if (move_parent && current_element.parentElement) {
					current_element = current_element.parentElement;
				}

				const offset_top = getElementOffset(current_element, "top", use_style);
				const offset_left = getElementOffset(current_element, "left", use_style);

				current_element.style.top = `${offset_top - pos2[index]}px`;
				current_element.style.left = `${offset_left - pos1[index]}px`;
			}
		},
		[
			elements,
			header_query_selector,
			move_parent,
			pos1,
			pos2,
			pos3,
			pos4,
			use_style,
		],
	);

	useEffect(
		() => {
			const elements_local = Array.from(document.querySelectorAll(header_query_selector)) as HTMLElement[];

			set_elements(elements_local);
			set_pos1(Array.from({ length: elements_local.length }, () => 0));
			set_pos2(Array.from({ length: elements_local.length }, () => 0));
			set_pos3(Array.from({ length: elements_local.length }, () => 0));
			set_pos4(Array.from({ length: elements_local.length }, () => 0));

			const dragMouseDown = makeDragMouseDown(elements_local);

			elements_local.forEach((element) => {
				if (element) {
					element.addEventListener("mousedown", dragMouseDown);
				}
			});

			return () => {
				elements_local.forEach((elem) => {
					if (elem) {
						elem.removeEventListener("mousedown", dragMouseDown);
					}
				});
			};
		},
		[header_query_selector],
	);

	useEffect(
		() => {
			if (elements) {
				elements.forEach((element) => {
					if (is_mouse_down && element) {
						document.addEventListener("mouseup", closeDragElement);
						document.addEventListener("mousemove", elementDrag);
					}
				});

				return () => {
					elements.forEach((element) => {
						if (is_mouse_down && element) {
							document.removeEventListener("mouseup", closeDragElement);
							document.removeEventListener("mousemove", elementDrag);
						}
					});
				};
			}
		},
		[
			elementDrag,
			elements,
			is_mouse_down,
		],
	);
};