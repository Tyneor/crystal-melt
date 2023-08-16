<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Tag from "./Tag.svelte";

	const kindOptions = ["gray", "highcontrast", "outline", "primary"] as const;
</script>

<Meta
	title="Basic/Tag"
	component={Tag}
	argTypes={{
		kind: { control: { type: "inline-radio" }, options: kindOptions },

		click: { table: { disable: true }, action: "click" },
	}}
/>

<Story id="story" name="Tag" let:args>
	<Tag {...args} on:click={args.click}>carbonaram</Tag>
</Story>
