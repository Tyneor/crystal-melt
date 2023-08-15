<script lang="ts" context="module">
	const kindOptions = ["primary", "secondary", "tertiary", "ghost", "text"] as const;
	const sizeOptions = ["s", "m", "l"] as const;
	export type Kind = (typeof kindOptions)[number];
	export type Size = (typeof sizeOptions)[number];
</script>

<script lang="ts">
	import type { ComponentType } from "svelte";

	export let kind: Kind = "primary";
	export let label: string | undefined = undefined;
	export let icon: ComponentType | undefined = undefined;
	export let href: string | undefined = undefined;
	export let size: Size = "m";
	export let danger = false;
	export let disabled = false;
	export let strech = false;
	export let node: HTMLElement | undefined = undefined;

	$: buttonProps = {
		disabled: disabled === true ? true : undefined,
		...$$restProps,
		class: [
			`kind-${kind}`,
			`size-${size}`,
			danger && "danger",
			strech && "strech",
			!label && "square",
			$$restProps.class,
		]
			.filter(Boolean)
			.join(" "),
	};
</script>

{#if href}
	<a role="button" {href} on:click bind:this={node} {...buttonProps}>
		{#if label}{label}{/if}
		{#if icon}<svelte:component this={icon} />{/if}
	</a>
{:else}
	<button on:click bind:this={node} {...buttonProps}>
		{#if label}{label}{/if}
		{#if icon}<svelte:component this={icon} />{/if}
	</button>
{/if}

<style lang="scss">
	:is(a[role="button"], button) {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
		font-size: 0.875rem;
		white-space: nowrap;
		border: none;
		padding: 0 1rem;
		border: 1px solid transparent;
		// width: fit-content; // to avoid button horizontally stretch inside a flex-direction: column;

		&.strech {
			flex: 1;
			justify-content: space-between;
		}

		&.square {
			aspect-ratio: 1 / 1;
			padding: 0;
			justify-content: center;
		}

		&:focus {
			border-color: var(--primary);
			box-shadow:
				inset 0 0 0 1px var(--primary),
				inset 0 0 0 2px var(--on-color);
		}

		&.size-s {
			--size: 2rem;
		}
		&.size-m {
			--size: 2.5rem;
		}

		&.size-l {
			--size: 3rem;
		}
		height: var(--size);
		min-height: var(--size);

		&.kind-primary {
			color: var(--on-color);
			background-color: var(--primary);

			&:hover {
				background-color: var(--primary-hover);
			}

			&:active {
				background-color: var(--primary-active);
			}
		}

		&.kind-secondary {
			color: var(--on-color);
			background-color: var(--secondary);

			&:hover {
				background-color: var(--secondary-hover);
			}

			&:active {
				background-color: var(--secondary-active);
			}
		}

		&.kind-tertiary {
			color: var(--primary);
			background-color: transparent;
			border-color: var(--primary);

			&:hover {
				color: var(--on-color);
				background-color: var(--primary-hover);
			}

			&:active {
				color: var(--on-color);
				background-color: var(--primary-active);
			}

			&[disabled] {
				background-color: transparent;
			}

			&:focus {
				color: var(--on-color);
				background-color: var(--primary);
			}

			&.danger {
				color: var(--danger);
				background-color: transparent;

				&:not(:focus) {
					border-color: var(--danger);
				}
			}
		}

		&.kind-ghost {
			color: var(--primary);
			background-color: transparent;

			&:hover {
				color: var(--primary-hover);
				background-color: var(--layer-0-hover);
			}

			&:active {
				color: var(--primary-active);
				background-color: var(--layer-0-active);
			}

			&[disabled] {
				background-color: transparent;
			}

			&.danger {
				color: var(--danger);
				background-color: transparent;
			}

			&.square {
				color: var(--on-layer-primary);
			}
		}

		&.kind-text {
			background-color: transparent;
			color: var(--on-layer-primary);

			&:hover {
				color: var(--on-layer-primary);
				background-color: var(--layer-0-hover);
			}

			&:active {
				color: var(--on-layer-primary);
				background-color: var(--layer-0-active);
			}

			&[disabled] {
				background-color: transparent;
				border-color: var(--border-subtle);
			}
		}

		&.danger {
			background: var(--danger);

			&:hover {
				color: var(--on-color);
				background-color: var(--danger-hover);
			}

			&:active {
				color: var(--on-color);
				background-color: var(--danger-active);
			}
		}

		&[disabled]:is(&, :hover) {
			cursor: not-allowed;
			color: var(--text-disabled);
			background-color: var(--container-disabled);
		}

		&.navbar-item,
		&.navbar-menu-option {
			color: var(--on-layer-secondary);

			&.navbar-item {
				gap: 0.5rem;
			}

			&[aria-current="true"] {
				color: var(--on-layer-primary);

				&::after {
					position: absolute;
					content: "";
					left: -1px;
					bottom: -1px;
					background-color: var(--primary);
				}

				&.navbar-item::after {
					right: -1px;
					height: 3px;
				}

				&.navbar-menu-option::after {
					top: -1px;
					width: 3px;
				}
			}
		}
	}

	a {
		text-decoration: none;
	}
</style>
