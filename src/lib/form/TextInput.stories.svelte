<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import { action } from "@storybook/addon-actions";
	import { createDebounce } from "../utils/debounce.js";
	import TextInput, { kindOptions } from "./TextInput.svelte";

	const debounce = createDebounce((e) => action("change (debounced)")(e));
</script>

<Meta
	title="Form/TextInput"
	component={TextInput}
	argTypes={{
		name: { control: { type: "text" } },
		placeholder: { control: { type: "text" } },
		kind: { control: { type: "inline-radio" }, options: kindOptions },
		disabled: { control: { type: "boolean" } },
		minRowCount: { control: "number", if: { arg: "kind", eq: "multiline" } },
		maxRowCount: { control: "number", if: { arg: "kind", eq: "multiline" } },
	}}
	args={{ name: "textinput", placeholder: "Enter some text...", minRowCount: 2, maxRowCount: 5 }}
/>

<Story id="textinput" name="TextInput" let:args>
	<TextInput
		{...args}
		on:change={(e) => {
			action("change")(e);
			debounce(e);
		}}
	/>
</Story>
