<script lang="ts">
	import { computePosition, offset, type ClientRectObject } from "@floating-ui/dom";
	import CaretDown from "carbon-icons-svelte/lib/CaretDown.svelte";
	import CaretRight from "carbon-icons-svelte/lib/CaretRight.svelte";
	import { createEventDispatcher, getContext, onDestroy, tick } from "svelte";
	import type { Writable } from "svelte/store";
	import type { TreeNodeData } from "./Tree.svelte";
	import Tree from "./TreeList.svelte";

	export let node: TreeNodeData;
	export let depth = 0;
	export let allowDrag = false;

	let expanded = false;

	// selection
	const selectedNodeId = getContext<Writable<TreeNodeData["id"] | null>>("selectedNodeId");
	const select = () => !node.disabled && ($selectedNodeId = node.id);

	// drag & drop
	const draggedNode =
		getContext<Writable<{ index: number; parentList: TreeNodeData[] } | null>>("draggedNode");
	$: dragged = $draggedNode?.parentList[$draggedNode.index] === node;

	const dispatch = createEventDispatcher<{ startDrag: null; drop: "above" | "below" }>();

	const startDrag = async () => {
		if (!allowDrag || node.disabled) return;
		dispatch("startDrag");
		await tick();
		(draggedElt as any)?.showPopover();
	};

	const isChildOf = (potentialChild: TreeNodeData, potentielParent: TreeNodeData): boolean => {
		if (potentielParent === potentialChild) return true;
		if (!potentielParent.children) return false;
		return potentielParent.children.some((child) => isChildOf(potentialChild, child));
	};

	let dropPosition: "drop-above" | "drop-below" | "drop-in" | null = null;
	let timer: NodeJS.Timeout;
	const prepareDrop = (ev: MouseEvent & { currentTarget: HTMLDivElement }) => {
		const _draggedNode = $draggedNode?.parentList[$draggedNode.index];
		if (!allowDrag || node.disabled || !_draggedNode || isChildOf(node, _draggedNode)) {
			if (dropPosition !== null) dropPosition = null;
			return;
		}

		const computeDropPosition = (targetRect: DOMRect, mouseY: number) => {
			if (mouseY < targetRect.y) return null;
			if (mouseY < targetRect.y + (1 / 3) * targetRect.height) return "drop-above";
			if (mouseY < targetRect.y + (2 / 3) * targetRect.height) return "drop-in";
			if (mouseY < targetRect.y + (3 / 3) * targetRect.height) return "drop-below";
			return null;
		};

		const previousDropPosition = dropPosition;
		dropPosition = computeDropPosition(ev.currentTarget.getBoundingClientRect(), ev.clientY);

		if (dropPosition === "drop-in") {
			if (
				previousDropPosition !== "drop-in" &&
				!expanded &&
				node.children &&
				node.children?.length > 0
			) {
				const MsBeforeOpening = 1000;
				timer = setTimeout(() => (expanded = true), MsBeforeOpening);
			}
		} else {
			clearTimeout(timer);
		}
	};

	const drop = () => {
		if (!$draggedNode) return;

		if (dropPosition === "drop-above") {
			dispatch("drop", "above");
		} else if (dropPosition === "drop-in") {
			expanded = true;
			const [_draggedNode] = $draggedNode.parentList.splice($draggedNode.index, 1);
			if (_draggedNode) (node.children ??= []).push(_draggedNode);
			$draggedNode = null;
		} else if (dropPosition === "drop-below") {
			dispatch("drop", "below");
		} else {
			$draggedNode = null;
		}

		dropPosition = null;
	};

	let draggedElt: HTMLDivElement | undefined;
	let mouse: { getBoundingClientRect(): ClientRectObject };

	const mousemove = ({ clientX: x, clientY: y }: MouseEvent) => {
		// TODO only observe mousemove if its the dragged node
		const mouseRect = { width: 0, height: 0, x, y, top: y, left: x, right: x, bottom: y };
		mouse = { getBoundingClientRect: () => mouseRect };
	};

	$: if (draggedElt) {
		computePosition(mouse, draggedElt, {
			placement: "bottom-start",
			middleware: [offset({ mainAxis: 8, crossAxis: 8 })],
		}).then(({ x, y }) => {
			if (!draggedElt) return;
			Object.assign(draggedElt.style, { left: `${x}px`, top: `${y}px` });
		});
	}

	const cancelDrop = () => {
		clearTimeout(timer);
		dropPosition = null;
	};

	$: if ($draggedNode === null) {
		clearTimeout(timer);
		(draggedElt as any)?.hidePopover();
	}

	onDestroy(() => {
		clearTimeout(timer);
		(draggedElt as any)?.hidePopover();
	});
</script>

<svelte:window on:mousemove={mousemove} />

<div
	class="line {dropPosition}"
	role="treeitem"
	tabindex={node.disabled ? undefined : 0}
	aria-disabled={node.disabled}
	aria-expanded={expanded}
	class:dragged
	on:mousedown={startDrag}
	on:mousemove={prepareDrop}
	on:mouseleave={cancelDrop}
	on:mouseup={drop}
	aria-selected={$selectedNodeId === node.id}
	on:click={select}
	on:keydown={(e) => (e.key === "Enter" || e.key === " ") && select()}
	style="--depth: {depth}"
>
	{#if node.children && node.children.length > 0}
		<button
			class="toggle"
			on:mousedown|stopPropagation
			on:click|stopPropagation={() => (expanded = !expanded)}
		>
			<svelte:component this={expanded ? CaretDown : CaretRight} />
		</button>
	{/if}
	{#if node.icon}<svelte:component this={node.icon} />{/if}
	<span>{node.label}</span>
</div>
{#if node.children && node.children.length > 0}
	<Tree children={node.children} depth={depth + 1} hidden={!expanded} {allowDrag} />
{/if}

{#if dragged}
	<div popover="manual" bind:this={draggedElt}>
		<div class="line dragged">
			{#if node.icon}<svelte:component this={node.icon} />{/if}
			<span>{node.label}</span>
		</div>
	</div>
{/if}

<style lang="scss">
	.line {
		position: relative;
		cursor: pointer;
		height: 2rem; // size sm
		display: flex;
		align-items: center;
		user-select: none;

		&:not(.root > .node > .line):not([popover] .line) {
			--trail-length: 1.5rem;

			&:has(.toggle) {
				--trail-length: 1rem;
			}

			::before {
				z-index: 1;
				content: "";
				position: absolute;
				left: calc(1.5rem * var(--depth));
				bottom: 1rem;
				height: 1px;
				width: var(--trail-length);
				background-color: var(--border-subtle);
			}
		}

		&:not([popover] .line) {
			margin-left: calc(-1.5rem * var(--depth) - 0.5rem);
			padding-left: calc(1.5rem * var(--depth) + 0.5rem);
		}

		&:focus:not(.dragged) {
			outline: 2px solid var(--primary);
			outline-offset: -2px;
		}

		&:hover:not([aria-disabled="true"]) {
			background-color: var(--layer-0-hover);
		}

		&[aria-selected="true"] {
			background-color: var(--layer-0-selected);

			&::after {
				position: absolute;
				content: "";
				inset: 0;
				right: unset;
				width: 3px;
				background-color: var(--primary);
			}

			&:hover {
				background-color: var(--layer-0-selected-hover);
			}
		}

		&[aria-disabled="true"] {
			cursor: not-allowed;

			&,
			& button {
				color: var(--text-disabled);
			}
		}

		&.dragged:not([aria-disabled="true"]) {
			background-color: var(--hightlight);
		}

		--drop-border-color: var(--border-strong);
		--drop-border-width: 2px;
		&.drop- {
			&above::after {
				position: absolute;
				content: "";
				inset: 0;
				bottom: unset;
				height: var(--drop-border-width);
				background-color: var(--drop-border-color);
			}

			&in {
				outline: var(--drop-border-width) solid var(--drop-border-color);
				outline-offset: calc(-1 * var(--drop-border-width));
			}

			&below::after {
				position: absolute;
				content: "";
				inset: 0;
				top: unset;
				height: var(--drop-border-width);
				background-color: var(--drop-border-color);
			}
		}

		> .toggle {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 2rem;
			width: 2rem;
			cursor: pointer;
			border: none;
			background: transparent;

			&:focus-visible {
				outline: 2px solid var(--primary);
				outline-offset: -2px;
			}
		}

		> :global(svg) {
			margin-right: 0.5rem;

			&:not(.toggle + svg):not([popover] svg) {
				margin-left: 2rem;
			}
		}
	}

	[popover] {
		z-index: 1;
		border: none;
		position: absolute;
		background: transparent;

		> .line {
			padding: 0 0.5rem;
		}
	}
</style>
