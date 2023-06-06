"use client";

/* istanbul ignore file */

import { Component, TraitProperties } from "grapesjs";
import {
	ComponentAttributeChangeHandler,
	ComponentAttributeChangeHandlerOptions,
	GenericObject,
} from "@open-press/interfaces";
import { capitalize } from "lodash";

/**
 * Utility class for components in grapesjs
 */
class ComponentUtility {
	/**
	 * Functional middleware to reject `idUpdate` events in component attributes
	 * @param {ComponentAttributeChangeHandler} callback Function to call when the event is not an `idUpdate`
	 * @returns {(component: Component, value: string, options: ComponentAttributeChangeHandlerOptions) => (undefined |
	 *     void)} Wrapped callback function
	 */
	static rejectIdUpdatesMiddleware(
		callback: ComponentAttributeChangeHandler,
	) {
		return (
			component: Component,
			value: string,
			options: ComponentAttributeChangeHandlerOptions,
		) => {
			// Reject `idUpdate` events
			if (options.idUpdate) {
				return;
			}

			// Call the callback if not an `idUpdate` event
			return callback.bind(component)(component, value, options);
		};
	}

	/**
	 * Register hook attributes changes to the component.
	 * This will call the `handle{AttributeName}AttributeChange` method on the component
	 * @param {Component} component Component to hook
	 */
	static hookAttributesChanges(component: Component) {
		for (const attribute in component.getAttributes({
			noClass: true,
			noStyle: true,
		})) {
			const handler_name = `handle${capitalize(attribute)}AttributeChange`;

			if (handler_name in component) {
				console.log("hook applied to", handler_name);
				component.on(
					`change:attributes:${attribute}`,
					ComponentUtility.rejectIdUpdatesMiddleware((component as any)[handler_name]),
				);
			}
		}
	}

	/**
	 * Re-init hook attributes changes to the component in order to apply eventual ui transformation needed.
	 * This will call the `handle{AttributeName}AttributeChange` method on the component with the `init` option set to
	 * `true`.
	 * @param {Component} component Component to run hooks on
	 */
	static reInitHookedAttributesChanges(component: Component) {
		for (const attribute in component.getAttributes({
			noClass: true,
			noStyle: true,
		})) {
			const handler_name = `handle${capitalize(attribute)}AttributeChange`;

			if (handler_name in component) {
				(component as any)[handler_name](
					component,
					component.getAttributes({
						noClass: false,
						noStyle: false,
					})[attribute],
					{ init: true },
				);
			}
		}
	}

	/**
	 * Reset the attributes of a component
	 * @param {Component} component Component to reset attributes on
	 * @param {GenericObject} override Attributes to override
	 */
	static resetAttributes(
		component: Component,
		override: GenericObject,
	) {
		component.setAttributes(
			{
				...component.getAttributes({
					noClass: true,
					noStyle: true,
				}),
				...override,
			},
			{ stop_propagation: true } as any,
		);
	}

	/**
	 * Add a trait to a component or reset it if it already exists
	 * @param {Component} component Component to add the trait to
	 * @param {boolean} should_add_trait Whether the trait should be added or not
	 * @param {TraitProperties} trait Trait to add
	 * @param {ComponentAttributeChangeHandlerOptions} options Options
	 */
	static addTraitOrReset(
		component: Component,
		should_add_trait: boolean,
		trait: TraitProperties,
		options: ComponentAttributeChangeHandlerOptions,
	) {
		const should_reset = !options.stop_propagation && !options.init;

		if (should_add_trait) {
			if (!component.getTrait(trait.name)) {
				component.addTrait(trait);
			}
		}
		else if (component.getTrait(trait.name) && should_reset) {
			ComponentUtility.resetAttributes(component, {
				[trait.name]: null,
			});
			component.removeTrait(trait.name);
		}
	}

	/**
	 * Add a trait to a component or reset it if it already exists
	 * @param {Component} component Component to add the trait to
	 * @param {boolean} should_add_trait Whether the trait should be added or not
	 * @param traits Traits to add
	 * @param {ComponentAttributeChangeHandlerOptions} options Options
	 */
	static addTraitsOrReset(
		component: Component,
		should_add_trait: boolean,
		traits: TraitProperties[],
		options: ComponentAttributeChangeHandlerOptions,
	) {
		traits.forEach((trait) => {
			ComponentUtility.addTraitOrReset(component, should_add_trait, trait, options);
		});
	}
}

/**
 * Utility class for grapesjs
 */
export class GrapesJsUtility {
	/**
	 * Component utility
	 * @type {ComponentUtility}
	 */
	public static component = ComponentUtility;
}