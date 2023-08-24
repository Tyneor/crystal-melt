<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Document from "carbon-icons-svelte/lib/Document.svelte";
	import Folder from "carbon-icons-svelte/lib/Folder.svelte";
	import Tree, { type TreeNodeData } from "./Tree.svelte";

	const newNode = (id: number): TreeNodeData => ({
		id,
		icon: Folder,
		label: `Item_${id}`,
		children: [{ id: id * 1000 + 1, icon: Document, label: `Child_${id * 1000 + 1}` }],
	});

	const children: TreeNodeData[] = [
		{
			id: 1,
			icon: Folder,
			label: "Apple",
			children: [
				{
					id: 11,
					icon: Folder,
					label: "Pineapple",
					children: [
						{ id: 111, disabled: true, icon: Document, label: "AYAYAYAYAY" },
						{ id: 112, icon: Document, label: "BYBB" },
					],
				},
				{
					id: 12,
					icon: Folder,
					label: "Applejuice",
				},
			],
		},
		...Array.from({ length: 30 }).map((e, i) => newNode(i + 2)),
	];
</script>

<Meta
	title="Layout/Tree"
	component={Tree}
	parameters={{ layout: "fullscreen" }}
	argTypes={{
		allowDrag: { control: { type: "boolean" } },
		children: { control: { type: "object" } },
		select: { table: { disable: true }, action: "select" },
	}}
	args={{ children, allowDrag: true }}
/>

<Story id="tree" name="Tree" let:args>
	<aside>
		<Tree {...args} on:select={args.select} />
	</aside>
</Story>

<style lang="scss">
	aside {
		width: 20rem;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
