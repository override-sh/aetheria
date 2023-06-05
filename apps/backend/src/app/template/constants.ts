/**
 * @description This object contains the event names that are emitted by the TemplateController.
 */
export const TEMPLATE_CONTROLLER_EVENTS = {
	creation_before: "hook.template.creation.before",
	creation_after:  "hook.template.creation.after",
	update_before:   "hook.template.update.before",
	update_after:    "hook.template.update.after",
	delete_before:   "hook.template.delete.before",
	delete_after:    "hook.template.delete.after",
	list_before:     "hook.template.list.before",
	list_after:      "hook.template.list.after",
	get_before:      "hook.template.get.before",
	get_after:       "hook.template.get.after",
} as const;