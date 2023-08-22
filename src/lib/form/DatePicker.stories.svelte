<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import DatePicker from "./DatePicker.svelte";

	const kindOptions = ["single", "range"] as const;
</script>

<Meta
	title="Form/DatePicker"
	component={DatePicker}
	argTypes={{
		name: { control: { type: "text" } },
		placeholder: { control: { type: "text" } },
		kind: { control: { type: "inline-radio" }, options: kindOptions },

		change: { table: { disable: true }, action: "change" },
	}}
	args={{ name: "datepicker", placeholder: "Enter a date" }}
/>

<Story id="datepicker" name="DatePicker" let:args>
	<DatePicker {...args} on:change={args.change} />
</Story>
