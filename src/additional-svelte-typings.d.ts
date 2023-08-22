// https://github.com/sveltejs/language-tools/issues/1249
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
// node_modules/.pnpm/svelte@4.0.5/node_modules/svelte/elements.d.ts

type EventHandler<E extends Event = Event, T extends EventTarget = Element> = (
	event: E & { currentTarget: EventTarget & T }
) => unknown;

declare global {
	type ToggleEvent = Event & { newState: "closed" | "open" };
	type ToggleEventHandler<T extends EventTarget> = EventHandler<ToggleEvent, T>;

	interface HTMLElement {
		/** https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/showPopover */
		showPopover(): void;
		/** https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidePopover */
		hidePopover(): void;
	}

	namespace svelteHTML {
		interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
			popover?: "auto" | "manual" | boolean;
		}

		interface DOMAttributes<T extends EventTarget> {
			"on:toggle"?: ToggleEventHandler<T> | undefined | null;
		}

		interface HTMLAttributes<T extends HTMLButtonElement> extends AriaAttributes, DOMAttributes<T> {
			popovertarget?: string;
		}
	}
}

export {};
