<script lang="ts">
	import Close from "carbon-icons-svelte/lib/Close.svelte";
	import Button from "../basic/Button.svelte";

	export let title: string;

	let dialogElt: HTMLDialogElement | undefined;
</script>

<slot name="trigger" open={() => dialogElt?.showModal()} />

<dialog bind:this={dialogElt}>
	<header>
		<h1>{title}</h1>
		<Button icon={Close} on:click={() => dialogElt?.close()} kind="ghost" />
	</header>
	<div class="content"><slot /></div>
	{#if $$slots.footer}
		<footer><slot name="footer" close={() => dialogElt?.close()} /></footer>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		margin: auto;
		border: none;
		background-color: var(--layer-1);
		font-size: 0.875rem;

		> header {
			display: flex;
			justify-content: space-between;

			> h1 {
				font-size: 1.25rem;
				font-weight: 400;
				padding: 1rem;
			}
		}

		> .content {
			padding: 0 1rem 3rem 1rem;
		}

		> footer {
			display: flex;
		}

		&::backdrop {
			background-color: var(--backdrop);
		}
	}
</style>
