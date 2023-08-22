<script lang="ts">
	import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";
	import { createEventDispatcher } from "svelte";

	export let name: string | undefined = undefined;
	export let disabled = false;
	export let checked = false;
</script>

<label>
	<input {name} type="checkbox" {disabled} bind:checked on:change />
	{#if checked}<Checkmark />{/if}
	<slot />
</label>

<style lang="scss">
	label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		position: absolute;
		font-size: 0.875rem;
		cursor: pointer;
		--color: var(--on-layer-primary);

		> input {
			position: absolute;
			width: 0;
			height: 0;
			// can't use hidden or display:none/contents to be able to focus the input
		}

		&::before {
			display: block;
			content: "";
			width: 1rem;
			height: 1rem;
			border: 1px solid var(--color);
		}

		&:has(input:checked) {
			&::before {
				background-color: var(--color);
				border: none;
			}

			> :global(svg) {
				position: absolute;
				left: 1px;
				width: 0.875rem;
				height: 0.875rem;
				color: var(--on-color);
			}
		}

		&:has(input:focus-visible) {
			&::before {
				outline: 2px solid var(--primary);
				outline-offset: 1px;
			}
		}

		&:has(input[disabled]) {
			cursor: unset;
			color: var(--text-disabled);
			--color: var(--container-disabled);
		}
	}
</style>
