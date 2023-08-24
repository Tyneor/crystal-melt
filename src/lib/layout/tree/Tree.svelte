<script lang="ts" context="module">
	export type TreeNodeData = {
		disabled?: boolean;
		id: PropertyKey;
		icon?: ComponentType;
		label: string;
		children?: TreeNodeData[];
	};
</script>

<script lang="ts">
	import { createEventDispatcher, setContext, type ComponentType } from "svelte";
	import { writable } from "svelte/store";
	import TreeList from "./TreeList.svelte";

	export let children: TreeNodeData[];
	export let allowDrag = false;

	const dispatch = createEventDispatcher<{ select: TreeNodeData["id"] | null }>();

	const selectedNodeId = writable<TreeNodeData["id"] | null>();
	setContext("selectedNodeId", selectedNodeId);
	$: dispatch("select", $selectedNodeId);

	const draggedNode = writable<{ index: number; parentList: TreeNodeData[] } | null>(null);
	setContext("draggedNode", draggedNode);
	$: if ($draggedNode) {
		// maybe make the ul.root have overflow hidden instead but it won't look as cool I think
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.removeProperty("overflow");
	}
</script>

<svelte:window on:mouseup={() => ($draggedNode = null)} />

<TreeList {children} {allowDrag} />
