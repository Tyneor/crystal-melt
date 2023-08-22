<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Dropdown from "./Dropdown.svelte";

	let placeholder = "Select something";
	let disabled = false;
	let multiple = false;
	const options = ["Framboise", "Banane", "Abricot"];
</script>

<Meta
	title="Form/Dropdown"
	component={Dropdown}
	argTypes={{
		name: { control: { type: "text" } },
		placeholder: { control: { type: "text" } },

		change: { table: { disable: true }, action: "change" },
	}}
	args={{ name: "dropdown", placeholder: "Select a fruit" }}
/>

<Story id="dropdown" name="Dropdown" let:args>
	<Dropdown {...args} on:change={args.change} {options} />
</Story>
