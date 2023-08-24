<script lang="ts">
	import Button from "$lib/basic/Button.svelte";
	import { autoUpdate, computePosition, flip, hide, shift, type Alignment } from "@floating-ui/dom";
	import { onDestroy, type ComponentProps } from "svelte";

	/**
	 * won't work with link button
	 */
	export let buttonProps: ComponentProps<Button>;
	export let closeOnClickOutside = true;
	export let defaultPosition: "bottom-start" | "bottom-end" = "bottom-start";

	let closeButtonElt: HTMLElement;
	let popoverElt: HTMLElement;
	let cleanup: (() => void) | undefined = undefined;

	const showPopover = (e: MouseEvent) => {
		if (!(e.currentTarget instanceof HTMLElement)) return;
		const openButtonElt = e.currentTarget;
		openButtonElt.blur();
		popoverElt.showPopover();

		cleanup && cleanup();
		cleanup = autoUpdate(openButtonElt, popoverElt, () =>
			computePosition(openButtonElt, popoverElt, {
				placement: defaultPosition,
				middleware: [flip(), shift(), hide()],
			}).then(({ x, y, middlewareData, placement }) => {
				if (middlewareData.hide?.referenceHidden) return hidePopover();

				Object.assign(popoverElt.style, { left: `${x}px`, top: `${y}px` });

				// I tried using accelerated positioning but the elements in the closeButton could slightly move so back to left and top
				// https://floating-ui.com/docs/misc#subpixel-and-accelerated-positioning
				// const roundByDPR = (value: number) => {
				// 	const dpr = window.devicePixelRatio || 1;
				// 	return Math.round(value * dpr) / dpr;
				// };
				// Object.assign(popoverElt.style, {
				// 	top: "0",
				// 	left: "0",
				// 	transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
				// });

				const [side, alignement] = placement.split("-") as ["top" | "bottom", Alignment];
				Object.assign(closeButtonElt.style, {
					top: side === "bottom" ? `${-closeButtonElt.offsetHeight}px` : "",
					bottom: side === "top" ? `${-closeButtonElt.offsetHeight}px` : "",
					left: alignement === "start" ? "0px" : "",
					right: alignement === "end" ? "0px" : "",
				});
			}),
		);
	};

	const hidePopover = () => (popoverElt as any).hidePopover();

	const onToggle = (e: ToggleEvent) => {
		// if (e.newState === "open")  popover.focus()
		if (e.newState === "closed") cleanup && cleanup();
	};

	onDestroy(() => cleanup && cleanup());
</script>

<svelte:component this={Button} {...buttonProps} on:click={showPopover} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={popoverElt}
	popover={closeOnClickOutside ? "auto" : "manual"}
	on:click|self={hidePopover}
	on:toggle={onToggle}
>
	<svelte:component
		this={Button}
		{...buttonProps}
		kind="text"
		aria-current="false"
		on:click={hidePopover}
		bind:node={closeButtonElt}
	/>
	<slot />
</div>

<style lang="scss">
	[popover] {
		border: none;
		position: absolute;
		background: transparent;
		filter: drop-shadow(var(--shadow));
		overflow: visible;

		> :global(button) {
			position: absolute;
		}

		> :global(:is(*, button.kind-text, button.kind-text:hover)) {
			background: var(--layer-1);
			color: var(--on-layer-primary);
		}
	}
</style>
