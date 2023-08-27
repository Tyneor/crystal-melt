<script lang="ts">
	export let orientation: "landscape" | "portrait" = "landscape";
	$: portrait = orientation === "portrait";

	export let nbPanes = 5;

	let containerElt: HTMLElement;
	$: widths = Array.from({ length: nbPanes }).map(() => 100 / nbPanes);

	const startDrag = (index: number) => {
		const moveHandler = moveHandlerBuilder(index);
		window.addEventListener("mousemove", moveHandler);
		window.addEventListener("mouseup", () => window.removeEventListener("mousemove", moveHandler), {
			once: true,
		});
	};

	const moveHandlerBuilder = (sIndex: number) => (event: MouseEvent) => {
		if (!containerElt) return;
		const total = portrait ? containerElt.clientHeight : containerElt.clientWidth;
		const percentage = (100 * (portrait ? event.pageY : event.pageX)) / total;
		const leftFactor = percentage / widths.slice(0, sIndex).reduce((s, e) => s + e, 0);
		const rightFactor = (100 - percentage) / (100 - percentage / leftFactor);
		console.log(leftFactor, rightFactor);
		for (let wIndex = 0; wIndex < widths.length; wIndex++) {
			widths[wIndex] *= wIndex < sIndex ? leftFactor : rightFactor;
		}
		widths = widths;
		console.log(widths.reduce((s, e) => s + e, 0));
	};
</script>

<section class:portrait bind:this={containerElt}>
	{#each widths as width, i}
		{#if i > 0}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<hr class="separator" on:mousedown={() => startDrag(i)} />
		{/if}
		<article style:width="{width}%">{width}</article>
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		height: 100%;
		width: 100%;

		> article {
			min-width: 5rem;
			display: grid;
			place-items: center;
			background-color: #f8f6f3;
		}

		> hr {
			z-index: 1;
			border: none;
			width: 0rem;
			padding: 0 0.0625rem;
			margin: 0 -0.0625rem;
			background-color: var(--border-subtle);
			cursor: col-resize;

			&:hover {
				padding: 0 0.3125rem;
				margin: 0 -0.3125rem;
				background-color: var(--hightlight);
			}
		}

		&.portrait {
			flex-direction: column;

			> hr {
				width: 0;
				height: 0.25rem;
				cursor: row-resize;
			}
		}
	}
</style>
