<!-- chrome://flags/ -->
<!-- #enable-experimental-web-platform-features -->
<script lang="ts">
	export let closeOnClickOutside = true;
	export let position: "top-left" | "top-right" = "top-left";

	let anchorName = `--${crypto.randomUUID()}`;
	let popoverElt: HTMLElement;
	let controller: AbortController | undefined = undefined;

	$: anchor =
		popoverElt?.previousElementSibling instanceof HTMLElement
			? popoverElt.previousElementSibling
			: null;
	$: {
		controller?.abort();
		controller = new AbortController();
		anchor?.addEventListener("click", showPopover, { signal: controller.signal });
	}

	export const showPopover = () => {
		if (!anchor) return;
		anchor.blur();
		anchor.style.setProperty("anchor-name", anchorName);
		popoverElt.showPopover();
	};
	export const hidePopover = () => (popoverElt as any).hidePopover();

	const onToggle = (e: ToggleEvent) => {
		if (e.newState === "open") {
			// popover.focus()
		}
		if (e.newState === "closed") {
			anchor?.style.removeProperty("anchor-name");
		}
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={popoverElt}
	popover={closeOnClickOutside ? "auto" : "manual"}
	style="--anchor-name:{anchorName};"
	class={position}
	on:toggle={onToggle}
	on:click|self={hidePopover}
>
	<!-- {...$$restProps} -->
	<slot {hidePopover} />
</div>

<style lang="scss">
	// @position-fallback --bottom-to-top {
	// 	@try {
	// 		top: anchor(top);
	// 	}

	// 	@try {
	// 		bottom: anchor(bottom);
	// 	}
	// }

	[popover] {
		border: none;
		position: absolute;
		background: transparent;
		filter: drop-shadow(var(--shadow));

		anchor-default: var(--anchor-name);
		// anchor-scroll: var(--anchor-name);

		inset: unset;
		inset-inline-start: auto;
		inset-inline-end: auto;
		// position-fallback: --bottom-to-top;

		&:popover-open {
			display: flex;
			flex-direction: column;
		}

		&.top-left {
			top: anchor(top);
			left: anchor(left);
			align-items: flex-start;
		}

		&.top-right {
			top: anchor(top);
			left: auto;
			right: anchor(right);
			align-items: flex-end;
		}
	}
</style>
