<script lang="ts">
	import { createSelect, melt } from "@melt-ui/svelte";
	import Checkmark from "carbon-icons-svelte/lib/Checkmark.svelte";
	import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
	import Close from "carbon-icons-svelte/lib/Close.svelte";
	import { fly } from "svelte/transition";
	import Button from "../basic/Button.svelte";
	import Tag from "../basic/Tag.svelte";
	import Checkbox from "./Checkbox.svelte";

	type T = $$Generic<string>;

	export let disabled = false;
	export let placeholder: string | undefined = undefined;
	export let multiple = false;
	export let options: T[]; // | Record<string, T[]> to support groups
	export let ariaLabel: string = "";

	const {
		options: { disabled: _disabled, multiple: _multiple },
		elements: { trigger, menu, option },
		states: { valueLabel, open, value },
		helpers: { isSelected },
	} = createSelect<T | T[] | undefined, boolean>({
		positioning: { placement: "bottom", sameWidth: true, gutter: 0 },
		disabled,
		multiple,
	});

	$: $_disabled = disabled;
	$: if (disabled) open.set(false);
	$: $_multiple = multiple;
	$: if (multiple || !multiple) value.set(undefined);
</script>

<button use:melt={$trigger} aria-label={ariaLabel}>
	{#if !$value}
		{placeholder || ""}
	{:else if !multiple}
		{$valueLabel}
		{#if $value}
			<Button
				icon={Close}
				size="s"
				kind="ghost"
				on:click={(e) => {
					e.preventDefault();
					value.set(undefined);
				}}
			/>
		{/if}
	{:else if Array.isArray($value)}
		<div class="tags">
			{#each $value as item, i}
				<Tag
					kind="highcontrast"
					filter={true}
					on:click={(e) => {
						e.preventDefault();
						if (Array.isArray($value)) {
							$value.splice(i, 1);
							$value = $value;
						}
					}}>{item}</Tag
				>
			{/each}
		</div>
	{/if}
	<ChevronDown />
</button>
{#if $open}
	<ul use:melt={$menu} transition:fly={{ duration: 150, y: -5 }} class:multiple>
		{#each options as item}
			<li use:melt={$option({ value: item, label: item })}>
				{#if multiple}
					<Checkbox checked={$isSelected(item)}>{item}</Checkbox>
				{:else}
					{item}
					{#if $isSelected(item)}
						<Checkmark />
					{/if}
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	button {
		width: 100%;
		font-size: 0.875rem;
		background-color: var(--layer-1);
		border: none;
		border-bottom: 1px solid var(--border-strong);
		padding: 0 0.5rem 0 1rem;
		text-overflow: ellipsis;
		height: 2rem;
		display: grid;
		grid-template-columns: 1fr auto auto;
		justify-items: flex-start;
		align-items: center;
		cursor: pointer;

		&:hover:not([disabled]) {
			background-color: var(--layer-1-hover);
		}

		&:focus {
			outline: 2px solid var(--primary);
			outline-offset: -1px;
		}

		&[disabled] {
			border-bottom-color: transparent;
			color: var(--text-disabled);
			cursor: unset;
		}

		> .tags {
			display: flex;
			gap: 0.25rem;
		}

		> :global(button) {
			margin-right: 0.25rem;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		background-color: var(--layer-1);
		box-shadow: var(--shadow);
		outline: 1px solid var(--primary);
		cursor: pointer;

		> li {
			height: 2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem;
			font-size: 0.875rem;
			text-overflow: ellipsis;

			&:hover {
				background-color: var(--layer-0-hover);
			}

			&[data-selected] {
				background-color: var(--layer-0-selected);

				&:hover {
					background-color: var(--layer-0-selected-hover);
				}
			}
		}

		&.multiple > li > :global(label) {
			pointer-events: none;
		}

		&:not(.multiple) > li[data-selected] {
			border: 2px solid var(--primary);
		}
	}
</style>
