<script lang="ts">
	import Button from "$lib/basic/Button.svelte";
	import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
	import Concept from "carbon-icons-svelte/lib/Concept.svelte";
	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";

	const kindOptions = ["primary", "secondary", "tertiary", "ghost", "text"] as const;
	const sizeOptions = ["s", "m", "l"] as const;
</script>

<Meta
	title="Basic/Button"
	component={Button}
	parameters={{}}
	argTypes={{
		label: { control: { type: "text" } },
		href: { control: { type: "text" } },
		kind: { control: { type: "inline-radio" }, options: kindOptions },
		size: { control: { type: "inline-radio" }, options: sizeOptions },
		icon: { control: { disable: true } },
		node: { table: { disable: true } },

		iconOnly: { control: { type: "boolean" } },
		withLink: { control: { type: "boolean" } },

		click: { table: { disable: true }, action: "click" },
	}}
/>

<Template let:args>
	<Button
		{...args}
		icon={Concept}
		label={args.iconOnly ? undefined : args.label}
		href={args.withLink ? "." : undefined}
		on:click={args.click}
	></Button>
</Template>

<Story name="Control" args={{ label: "My button" }} />

<Story name="Stretch in flex">
	<div class="card">
		<div class="content">My card</div>
		<div class="actions">
			<Button kind="secondary" strech label="Keep" />
			<Button danger icon={TrashCan} strech label="Delete" />
		</div>
	</div>
</Story>

<style lang="scss">
	.card {
		display: flex;
		margin: 1rem;
		flex-direction: column;
		justify-content: space-between;
		background: white;
		box-shadow: var(--shadow);
		width: 20rem;
		height: 10rem;
		> .content {
			padding: 1rem;
		}
		> .actions {
			display: flex;
		}
	}
</style>
