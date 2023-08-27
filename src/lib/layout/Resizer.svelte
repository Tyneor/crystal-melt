<script lang="ts">
	const THIS_COMPONENT_CLASS = "resizer";

	const getWidth = (el: Element, property?: "min" | "max") =>
		parseFloat(window.getComputedStyle(el)[property ? (`${property}Width` as const) : "width"]);

	let initialClientX: number | null = null;
	let previousMaxMovementX: number | null = null;
	let nextMaxMovementX: number | null = null;

	type ResizableElement = {
		initialWidth: number;
		minWidth: number;
		maxWidth: number;
		getWidth: () => number;
		setWidth: (value: number, unit: "px" | "%") => void;
	};
	let previousElts: ResizableElement[] = [];
	let nextElts: ResizableElement[] = [];

	const startDrag = (event: MouseEvent & { currentTarget: HTMLHRElement }) => {
		const thisElt = event.currentTarget;
		const parentElt = thisElt.parentElement;
		if (!parentElt) return;
		initialClientX = event.clientX;
		let resizerVisited = false;
		for (const child of parentElt.children) {
			if (child === thisElt) resizerVisited = true;
			if (child instanceof HTMLElement && !child.classList.contains(THIS_COMPONENT_CLASS)) {
				const resizableElement: ResizableElement = {
					initialWidth: getWidth(child),
					minWidth: getWidth(child, "min"),
					maxWidth: getWidth(child, "max"),
					getWidth: () => getWidth(child),
					setWidth: (value: number, unit: "px" | "%") => (child.style.width = value + unit),
				};
				resizerVisited ? nextElts.push(resizableElement) : previousElts.unshift(resizableElement);
				child.style.width = resizableElement.initialWidth + "px";
				child.style.flex = "unset";
			}
		}
		previousMaxMovementX = nextElts.reduce((maxMvt, elt) => maxMvt + elt.initialWidth - elt.maxWidth, 0);
		nextMaxMovementX = previousElts.reduce((maxMvt, elt) => maxMvt - elt.initialWidth + elt.maxWidth, 0);
		thisElt.classList.add("active");
		window.addEventListener("mousemove", moveHandler);

		const cleanup = () => {
			thisElt.classList.remove("active");
			window.removeEventListener("mousemove", moveHandler);
			const total = parentElt.clientWidth;
			for (const element of [...previousElts, ...nextElts]) {
				const width = element.getWidth();
				if (width !== element.minWidth) element.setWidth((width * 100) / total, "%");
			}
			previousElts = [];
			nextElts = [];
		};
		window.addEventListener("mouseup", cleanup, { once: true });
	};

	const moveHandler = (event: MouseEvent) => {
		const resizeElements = (elements: ResizableElement[], movementX: number) => {
			for (const { minWidth, maxWidth, initialWidth, setWidth } of elements) {
				const newClampedWidth = Math.max(minWidth, Math.min(maxWidth, initialWidth + movementX));
				setWidth(newClampedWidth, "px");
				movementX += initialWidth - newClampedWidth;
			}
			return movementX;
		};

		if (!initialClientX || !previousMaxMovementX || !nextMaxMovementX) return;
		let movementX = event.clientX - initialClientX;
		if (movementX < 0) {
			movementX = Math.max(movementX, previousMaxMovementX);
			const surplus = resizeElements(previousElts, movementX);
			resizeElements(nextElts, -movementX + surplus);
		} else if (movementX > 0) {
			movementX = Math.min(movementX, nextMaxMovementX);
			const surplus = resizeElements(nextElts, -movementX);
			resizeElements(previousElts, movementX + surplus);
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<hr class={THIS_COMPONENT_CLASS} on:mousedown={startDrag} />

<style lang="scss">
	hr {
		z-index: 1;
		border: none;
		width: 0rem;
		padding: 0 1px;
		margin: 0 -1px;
		background-color: var(--border-subtle);
		cursor: col-resize;
		overflow: visible;
		transition: background-color 0.1s;

		&:is(:hover, .active) {
			background-color: var(--border-strong);

			&::before {
				content: "";
				display: block;
				height: 100%;
				width: 2rem;
				translate: -50%;
			}
		}
	}
</style>
