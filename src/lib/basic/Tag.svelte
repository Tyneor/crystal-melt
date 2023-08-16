<script lang="ts" context="module">
	const kindOptions = ["gray", "highcontrast", "outline", "primary"] as const;
	export type Kind = (typeof kindOptions)[number];
</script>

<script lang="ts">
	import Close from "carbon-icons-svelte/lib/Close.svelte";

	export let kind: Kind = "primary";
	export let filter = false;
	export let disabled = false;

	$: tagProps = { disabled: disabled === true ? true : undefined };
</script>

<div class="tag kind-{kind}" {...tagProps}>
	<slot />
	{#if filter}<button on:click><Close /></button>{/if}
</div>

<style lang="scss">
	.tag {
		border-radius: 0.75rem;
		font-size: 0.75rem;
		line-height: 1.33;
		height: 1.5rem;
		padding: 0 0.5rem;
		display: inline-flex;
		align-items: center;
		gap: 0.125rem;

		@each $color in "gray", "primary", "highcontrast", "outline" {
			&.kind-#{$color} {
				background-color: var(--tag-#{$color}-back);

				& {
					color: var(--tag-#{$color}-front);
				}

				&:not([disabled]) > button:hover {
					background-color: var(--tag-#{$color}-hover);
				}
			}
		}

		&.kind-outline {
			box-shadow: inset 0 0 0 1px var(--secondary);
		}

		> button {
			cursor: pointer;
			color: inherit;
			border-radius: 50%;
			margin-right: -0.5rem;
			border: none;
			background: none;
			height: 100%;
			aspect-ratio: 1/1;
			display: grid;
			place-items: center;
		}

		&[disabled] {
			cursor: not-allowed;
			color: var(--text-disabled);
			background-color: var(--container-disabled);

			> button {
				pointer-events: none;
			}
		}
	}
</style>
