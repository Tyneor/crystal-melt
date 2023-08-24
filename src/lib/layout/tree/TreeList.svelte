<script lang="ts">
	import { getContext } from "svelte";
	import { flip } from "svelte/animate";
	import type { Writable } from "svelte/store";
	import type { TreeNodeData } from "./Tree.svelte";
	import TreeNode from "./TreeNode.svelte";

	export let children: TreeNodeData[];
	export let allowDrag = false;
	export let depth = 0;
	export let hidden = false;

	const draggedNode =
		getContext<Writable<{ index: number; parentList: TreeNodeData[] } | null>>("draggedNode");

	let dragParent = false;
	const startDrag = (index: number) => {
		dragParent = true;
		$draggedNode = { index, parentList: children };
	};

	$: if (dragParent && $draggedNode === null) {
		dragParent = false;
		children = children;
	}

	const drop = (targetIndex: number, position: "above" | "below") => {
		if (!$draggedNode) return;
		const [_draggedNode] = $draggedNode.parentList.splice($draggedNode.index, 1);
		let dropIndex = targetIndex + (position === "below" ? 1 : 0);
		dropIndex += $draggedNode.parentList === children && dropIndex > $draggedNode.index ? -1 : 0;
		if (_draggedNode) {
			children.splice(dropIndex, 0, _draggedNode);
			children = children;
		}
		$draggedNode = null;
	};
</script>

<ul role="group" class="children" class:root={depth === 0} class:hidden>
	{#each children as node, index (node.id)}
		<li class="node" animate:flip={{ duration: 100 }}>
			<TreeNode
				{node}
				{depth}
				{allowDrag}
				on:startDrag={() => startDrag(index)}
				on:drop={({ detail }) => drop(index, detail)}
			/>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul.children {
		list-style-type: none;
		padding-left: 0.5rem;

		&:not(.root) {
			margin-left: 1rem;

			position: relative;
			&::before {
				z-index: 1;
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				bottom: 1rem;
				width: 1px;
				background-color: var(--border-subtle);
			}
		}

		&.hidden {
			display: none;
		}

		// > .node {
		// 	margin-left: calc(-1.5rem * var(--depth) - 0.5rem);
		// 	padding-left: calc(1.5rem * var(--depth) + 0.5rem);
		// }
	}
</style>
