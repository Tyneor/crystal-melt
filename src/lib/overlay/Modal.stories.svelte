<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
	import Archive from "carbon-icons-svelte/lib/Archive.svelte";
	import Save from "carbon-icons-svelte/lib/Save.svelte";
	import Button from "$lib/basic/Button.svelte";
	import Modal from "$lib/overlay/Modal.svelte";

	let disabled = false;
	let password = false;
	let multiline = false;
	let placeholder = "Placeholder text";
</script>

<Meta
	title="Overlay/Modal"
	component={Modal}
	argTypes={{
		title: { control: { type: "text" } },
		disabled: { control: { type: "boolean" } },
	}}
	args={{ title: "Modal title" }}
/>

<Story id="modal" name="Modal" let:args>
	<Modal {...args}>
		<Button slot="trigger" let:open label="Open modal" on:click={open} />
		Modal content
		<svelte:fragment slot="footer" let:close>
			<Button strech danger label="Delete" icon={TrashCan} on:click={close} />
			<Button strech kind="secondary" label="Archive" icon={Archive} on:click={close} />
			<Button strech label="Save" icon={Save} on:click={close} />
		</svelte:fragment>
	</Modal>
</Story>
