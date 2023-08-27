<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Switch from "./Switch.svelte";
</script>

<Meta
	title="Form/Switch"
	component={Switch}
	argTypes={{
		label: { control: { type: "text" } },
		name: { control: { type: "text" } },

		change: { table: { disable: true }, action: "change" },
	}}
	args={{ name: "datepicker", label: "Accept Terms and Conditions" }}
/>

<Story id="_switch" name="Switch" let:args={{ label, name, checked, change }}>
	<Switch {name} {checked} on:change={change}>{label}</Switch>
</Story>
