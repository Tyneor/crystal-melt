<script lang="ts">
	import ChevronDown from "carbon-icons-svelte/lib/ChevronDown.svelte";
	import type { ComponentType } from "svelte";
	import Button from "$lib/basic/Button.svelte";
	import Popover from "$lib/overlay/Popover.svelte";

	export let label: string;
	export let selected = false;
	export let options: (
		| { label: string; icon?: ComponentType; href?: string; selected?: boolean }
		| "divider"
	)[] = [];
</script>

<Popover
	buttonProps={{
		kind: "text",
		size: "l",
		label,
		icon: ChevronDown,
		class: "navbar-item",
		"aria-current": selected,
	}}
>
	<menu>
		{#each options as option}
			{#if option === "divider"}
				<hr style="border: none; height: 1px; background-color: var(--border-subtle);" />
			{:else}
				{@const { label, icon, href, selected } = option}
				<Button
					strech
					kind="text"
					size="l"
					{label}
					{icon}
					{href}
					class="navbar-menu-option"
					aria-current={selected}
				/>
			{/if}
		{/each}
	</menu>
</Popover>

<style>
	menu {
		display: flex;
		flex-direction: column;
	}
</style>
