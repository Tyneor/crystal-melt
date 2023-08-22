<script lang="ts">
	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
	import Button from "../basic/Button.svelte";

	export let name: string;
	export let disabled = false;
	export let placeholder: string | undefined = undefined;

	let imageUrl: string | undefined = undefined;
	let imageName: string | undefined = undefined;
	let inputElt: HTMLInputElement;
	let buttonElt: HTMLButtonElement;
	let hovered = false;

	const readFile = (file?: File | undefined) => {
		if (!file) return;
		imageName = file.name;
		const reader = new FileReader();
		reader.addEventListener("loadend", () => (imageUrl = String(reader.result)));
		reader.readAsDataURL(file);
	};
</script>

<button
	bind:this={buttonElt}
	{disabled}
	on:click={() => inputElt.click()}
	on:drop|preventDefault={(e) => readFile(e.dataTransfer?.files?.[0])}
	style="--imageUrl: url({imageUrl})"
	class:hovered
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	on:dragenter={() => (hovered = true)}
	on:dragleave={() => (hovered = false)}
	on:dragover|preventDefault
>
	<input
		{name}
		bind:this={inputElt}
		type="file"
		{disabled}
		accept="image/png, image/jpeg"
		on:change={(e) => readFile(e.currentTarget.files?.[0])}
	/>
	{#if imageUrl}
		<div class="image-name">
			{imageName}
			<Button
				{disabled}
				kind="ghost"
				danger
				icon={TrashCan}
				on:click={(e) => {
					e.stopPropagation();
					imageName = undefined;
					imageUrl = undefined;
				}}
			/>
		</div>
	{:else if !disabled}
		<span class="placeholder">{placeholder}</span>
	{/if}
</button>

<style lang="scss">
	button {
		min-height: 20rem;
		min-width: 36rem;
		background-color: transparent;
		font-size: 0.875rem;
		background-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%),
			var(--imageUrl);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		cursor: pointer;
		border: 2px dashed var(--border-strong);

		> input {
			display: contents;
		}

		> .placeholder {
			pointer-events: none;
			padding: 1rem;
		}

		&:not(:active) .placeholder {
			color: var(--primary);
		}

		> .image-name {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
			padding-left: 1rem;
		}

		&:focus,
		&.hovered {
			border: 2px solid var(--primary);
		}

		&[disabled] {
			cursor: unset;
			color: var(--text-disabled);
			border: 2px dashed var(--border-subtle);
		}
	}
</style>
