<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import ImageInput from "./ImageInput.svelte";
</script>

<Meta
	title="Form/ImageInput"
	component={ImageInput}
	argTypes={{
		name: { control: { type: "text" } },
		placeholder: { control: { type: "text" } },
		disabled: { control: { type: "boolean" } },
	}}
	args={{ name: "datepicker", placeholder: "Drag and drop file here or click to upload" }}
/>

<Story id="imageinput" name="ImageInput" let:args>
	<ImageInput {...args} />
</Story>
