<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Slider from "./Slider.svelte";
</script>

<Meta
	title="Form/Slider"
	component={Slider}
	argTypes={{
		disabled: { control: { type: "boolean" } },
		name: { control: { type: "text" } },

		change: { table: { disable: true }, action: "change" },
	}}
	args={{ name: "slider" }}
/>

<Story id="slider" name="Slider" let:args={{ name, disabled, change }}>
	<Slider {name} {disabled} on:change={change}></Slider>
</Story>
