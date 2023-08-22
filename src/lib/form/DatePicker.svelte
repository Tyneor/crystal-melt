<script lang="ts">
	import "flatpickr/dist/themes/airbnb.css";

	import { computePosition, flip, hide, offset, shift } from "@floating-ui/dom";
	import Calendar from "carbon-icons-svelte/lib/Calendar.svelte";
	import type { FlatpickrFn, Instance } from "flatpickr/dist/types/instance.js";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import _flatpickr from "flatpickr";
	const flatpickr = _flatpickr as unknown as FlatpickrFn;

	export let name: string;
	export let placeholder: string | undefined = undefined;
	export let disabled = false;
	export let kind: "single" | "range" = "single";

	const dispatch = createEventDispatcher<{ change: Date | Date[] }>();
	let inputElt: HTMLInputElement;
	let popoverElt: HTMLDivElement;
	let calendarElt: HTMLDivElement;
	let flatPickrInstance: Instance;

	onMount(() => {
		flatPickrInstance = flatpickr(inputElt, {
			appendTo: calendarElt,
			inline: true,
			mode: kind,
			onChange: (e) => dispatch("change", e),
		});
	});

	$: {
		flatPickrInstance?.set("mode", kind);
		flatPickrInstance?.clear();
	}

	onDestroy(() => {
		flatPickrInstance.destroy();
	});

	const openPopover = () => {
		popoverElt.showPopover();

		computePosition(inputElt, popoverElt, {
			placement: "bottom-start",
			middleware: [offset(1), flip(), shift(), hide()],
		}).then(({ x, y, middlewareData }) => {
			if (middlewareData.hide?.referenceHidden) return (popoverElt as any).hidePopover();

			Object.assign(popoverElt.style, { left: `${x}px`, top: `${y}px` });
		});
	};
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && popoverElt.hidePopover()} />

<label class="date-picker-wrapper">
	<input
		{name}
		bind:this={inputElt}
		type="datetime"
		{disabled}
		{placeholder}
		autocomplete="off"
		on:click|preventDefault={openPopover}
		on:keydown={(e) => (e.key === "Enter" || e.key === " ") && openPopover()}
	/>
	<Calendar />
</label>

<div popover="auto" bind:this={popoverElt}><div class="calendar" bind:this={calendarElt} /></div>

<style lang="scss">
	label.date-picker-wrapper {
		display: block;
		position: relative;
		width: 24ch;
		max-width: 100%;

		> input {
			width: 100%;
			height: 2rem;
			font-size: 0.875rem;
			background-color: var(--layer-1);
			border: none;
			border-bottom: 1px solid var(--border-strong);
			padding: 0 2.5rem 0 1rem;
			text-overflow: ellipsis;

			&::placeholder {
				color: var(--on-layer-placeholder);
			}

			&:focus {
				outline: 2px solid var(--primary);
				outline-offset: -1px;
			}

			&[disabled] {
				border-bottom-color: transparent;
				color: var(--text-disabled);
				pointer-events: none;
			}
		}

		> :global(svg) {
			pointer-events: none;
			position: absolute;
			inset: 0;
			left: unset;
			margin: 0.5rem;
		}
		input[disabled] + :global(svg) {
			color: var(--text-disabled);
		}
	}

	[popover] {
		border: none;
		position: absolute;
		background: transparent;
		overflow: visible;

		.calendar {
			filter: drop-shadow(var(--shadow));
			background-color: var(--layer-1);
			padding: 1rem;

			> :global(.flatpickr-calendar) {
				background: unset;
				box-shadow: unset;
			}
		}
	}
</style>
