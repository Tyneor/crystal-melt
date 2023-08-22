<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Checkbox from "./Checkbox.svelte";
</script>

<Meta
	title="Form/Checkbox"
	component={Checkbox}
	argTypes={{
		label: { control: { type: "text" } },
		name: { control: { type: "text" } },

		change: { table: { disable: true }, action: "change" },
	}}
	args={{ name: "datepicker", label: "Accept Terms and Conditions" }}
/>

<Story id="checkbox" name="Checkbox" let:args>
	<Checkbox {...args} on:change={args.change}>{args.label}</Checkbox>
</Story>
