<script lang="ts" context="module">
	export const kindOptions = ["singleline", "search", "password", "multiline"] as const;
	export type Kind = (typeof kindOptions)[number];
</script>

<script lang="ts">
	import Close from "carbon-icons-svelte/lib/Close.svelte";
	import Search from "carbon-icons-svelte/lib/Search.svelte";
	import View from "carbon-icons-svelte/lib/View.svelte";
	import ViewOff from "carbon-icons-svelte/lib/ViewOff.svelte";
	import { createEventDispatcher } from "svelte";
	import { resize } from "../actions/resize.js";
	import Button from "../basic/Button.svelte";

	export let name: string;
	export let disabled = false;
	export let value: string = "";
	export let placeholder: string | undefined = undefined;
	export let kind: Kind = "singleline";
	export let minRowCount = 2;
	export let maxRowCount: number | undefined = 10;

	const dispatch = createEventDispatcher<{ change: string }>();
	let passwordShown = false;
	let textareaElt: HTMLTextAreaElement | undefined;

	const setRowCount = () => {
		if (!textareaElt) return;
		textareaElt.setAttribute("rows", String(Math.max(1, minRowCount)));
		textareaElt.style.setProperty("scrollbar-width", "none");
		const { paddingTop, paddingBottom } = window.getComputedStyle(textareaElt);
		const pxInREM = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
		let newRowCount = Math.floor(
			(textareaElt.scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom)) / pxInREM,
		);
		if (maxRowCount !== undefined) newRowCount = Math.min(newRowCount, Math.max(1, maxRowCount));
		textareaElt.style.removeProperty("scrollbar-width");
		textareaElt.setAttribute("rows", String(newRowCount));
	};

	$: (minRowCount || !minRowCount) && setRowCount();
	$: (maxRowCount || !maxRowCount) && setRowCount();

	$: dispatch("change", value);
</script>

{#if kind === "password"}
	<div class="password-input-wrapper">
		<input
			{name}
			type={passwordShown ? "text" : "password"}
			{disabled}
			{value}
			{placeholder}
			on:input={({ currentTarget }) => (value = currentTarget?.value)}
		/>
		{#if !disabled}
			<Button
				icon={passwordShown ? ViewOff : View}
				size="s"
				kind="ghost"
				on:click={() => (passwordShown = !passwordShown)}
			/>
		{/if}
	</div>
{:else if kind === "multiline"}
	<textarea
		{name}
		bind:this={textareaElt}
		bind:value
		{disabled}
		{placeholder}
		on:input={setRowCount}
		use:resize={setRowCount}
	/>
{:else if kind === "search"}
	<label class="search-input-wrapper">
		<Search />
		<input {name} type="search" {disabled} bind:value {placeholder} />
		{#if !disabled && value}
			<Button icon={Close} size="s" kind="ghost" on:click={() => (value = "")} />
		{/if}
	</label>
{:else}
	<input {name} type="text" {disabled} bind:value {placeholder} />
{/if}

<style lang="scss">
	input,
	textarea {
		width: 100%;
		font-size: 0.875rem;
		background-color: var(--layer-1);
		border: none;
		border-bottom: 1px solid var(--border-strong);
		padding: 0 1rem;
		text-overflow: ellipsis;

		&::placeholder {
			color: var(--on-layer-placeholder);
		}

		&:focus {
			outline: 2px solid var(--primary);
			outline-offset: -1px;
		}

		&[disabled] {
			border-bottom-color: transparent;
			color: var(--text-disabled);
		}
	}

	input {
		height: 2rem; //size s
	}

	textarea {
		padding: 0.675rem 1rem;
		resize: none;
		overflow-y: auto;
	}

	.password-input-wrapper {
		display: block;
		position: relative;

		> input {
			padding-right: 2.5rem;
		}

		> :global(button) {
			position: absolute;
			right: 0;
		}
	}

	.search-input-wrapper {
		display: block;
		position: relative;

		&:has(input[disabled]) > :global(svg) {
			color: var(--text-disabled);
		}

		> :global(svg) {
			position: absolute;
			color: var(--on-layer-secondary);
			margin: 0.5rem;
		}

		> input {
			padding-left: 2rem;

			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		> :global(button) {
			position: absolute;
			right: 0;
		}
	}
</style>
