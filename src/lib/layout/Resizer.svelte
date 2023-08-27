<script lang="ts">
	const COMPONENT_CLASS = "resizer";
	const DATA_INITIAL_WIDTH = "data-initial-width";

	const getWidth = (el: Element, property?: "min" | "max") =>
		parseFloat(window.getComputedStyle(el)[property ? (`${property}Width` as const) : "width"]);

	let initialClientX: number | null = null;
	let previousElts: HTMLElement[] = [];
	let nextElts: HTMLElement[] = [];

	const startDrag = (event: MouseEvent & { currentTarget: HTMLHRElement }) => {
		const thisElt = event.currentTarget;
		const parentElt = thisElt.parentElement;
		if (!parentElt) return;
		initialClientX = event.clientX;
		let resizerVisited = false;
		for (const child of parentElt.children) {
			if (child === thisElt) resizerVisited = true;
			if (child instanceof HTMLElement && !child.classList.contains(COMPONENT_CLASS)) {
				resizerVisited ? nextElts.push(child) : previousElts.unshift(child);
				const width = String(getWidth(child));
				child.setAttribute(DATA_INITIAL_WIDTH, width);
				child.style.flex = "unset";
				child.style.width = width + "px";
			}
		}
		thisElt.classList.add("active");
		window.addEventListener("mousemove", moveHandler);

		const cleanup = () => {
			thisElt.classList.remove("active");
			window.removeEventListener("mousemove", moveHandler);
			previousElts.forEach((el) => el.removeAttribute(DATA_INITIAL_WIDTH));
			nextElts.forEach((el) => el.removeAttribute(DATA_INITIAL_WIDTH));
			previousElts = [];
			nextElts = [];
		};
		window.addEventListener("mouseup", cleanup, { once: true });
	};

	const moveHandler = (event: MouseEvent) => {
		const resizeElements = (elements: HTMLElement[], movement: number) => {
			for (const elt of elements) {
				const initialWidth = parseFloat(elt.dataset.initialWidth ?? "");
				const [minWidth, maxWidth] = [getWidth(elt, "min"), getWidth(elt, "max")];
				const newClampedWidth = Math.max(minWidth, Math.min(maxWidth, initialWidth + movement));
				elt.style.width = `${newClampedWidth}px`;
				movement += initialWidth - newClampedWidth;
			}
			return movement;
		};

		if (!initialClientX) return;
		const movementX = event.clientX - initialClientX;
		if (movementX < 0) {
			const surplus = resizeElements(previousElts, movementX);
			resizeElements(nextElts, -movementX + surplus);
		} else if (movementX > 0) {
			const surplus = resizeElements(nextElts, -movementX);
			resizeElements(previousElts, movementX + surplus);
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<hr class={COMPONENT_CLASS} on:mousedown={startDrag} />

<style lang="scss">
	hr {
		z-index: 1;
		border: none;
		width: 0rem;
		padding: 0 0.5px;
		margin: 0 -0.5px;
		background-color: var(--border-subtle);
		cursor: col-resize;
		overflow: visible;

		// &:hover {
		// 	padding: 0 0.3125rem;
		// 	margin: 0 -0.3125rem;
		// 	background-color: var(--hightlight);
		// }

		&:is(:hover, .active) {
			padding: 0;
			margin: 0;
			outline: 0.5px solid var(--border-strong);

			&::before {
				position: relative;
				z-index: -1;
				display: block;
				content: "";
				height: 100%;
				width: 1rem;
				translate: -50%;
				// background-color: lightblue;
				// opacity: 0.5;
			}
		}
	}
</style>
