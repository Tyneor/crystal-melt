<script lang="ts">
	import { createSwitch, melt } from "@melt-ui/svelte";
	import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";

	export let name: string | undefined = undefined;
	export let disabled = false;
	export let checked = false;
	export let ariaLabel: string = "";

	const {
		options: { disabled: _disabled },
		elements: { root, input },
		states: { checked: _checked },
	} = createSwitch({ disabled, defaultChecked: checked });

	$: $_disabled = disabled;
	$: $_checked = checked;
</script>

<label>
	<button use:melt={$root} aria-labelledby={ariaLabel}>
		{#if $_checked}<Checkmark />{/if}
	</button>
	<slot />
	<input {name} use:melt={$input} />
</label>

<style lang="scss">
	label {
		cursor: pointer;
		width: fit-content;
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		gap: 0.5rem;

		> button {
			position: relative;
			height: 1rem;
			width: 2rem;
			border-radius: 0.75rem;
			border: none;
			background-color: var(--border-strong);

			&:focus {
				outline: 2px solid var(--primary);
				outline-offset: 1px;
			}

			&:before {
				content: "";
				background-color: var(--on-color);
				position: absolute;
				left: 0.1875rem;
				top: 0.1875rem;
				height: 0.625rem;
				width: 0.625rem;
				border-radius: 50%;
				transition: transform 70ms cubic-bezier(0.2, 0, 1, 0.9);
			}

			&[data-state="checked"] {
				background-color: var(--success);

				&:before {
					transform: translateX(1rem);
				}
			}

			> :global(svg) {
				fill: none;
				position: absolute;
				right: 0.28rem;
				top: 0.31rem;
				height: 0.4375rem;
				width: 0.4375rem;

				> :global(path) {
					stroke: var(--success);
					stroke-width: 0.25rem;
				}
			}
		}
	}
</style>
