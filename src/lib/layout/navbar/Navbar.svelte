<script lang="ts">
	import Menu from "carbon-icons-svelte/lib/Menu.svelte";
	import Button from "$lib/basic/Button.svelte";
	import { resize } from "$lib/actions/resize.js";

	export let titleLabel: string;
	export let titleHref: string | undefined = undefined;
	export let menuBreakpoint: `${string}px` = "640px";

	let width: number;
	$: menuFolded = width <= parseInt(menuBreakpoint, 10);
</script>

<header use:resize={({ contentRect }) => (width = contentRect.width)}>
	{#if menuFolded}<Button kind="ghost" size="l" icon={Menu} />{/if}
	<h1><a href={titleHref}>{titleLabel}</a></h1>
	<nav>
		{#if !menuFolded}
			<slot name="links" />
		{/if}
	</nav>

	<div class="actions">
		<slot name="actions" />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		width: 100vw;
		height: 3rem;
		box-shadow: inset 0px -1px 0 0 var(--border-subtle);

		> h1 {
			position: relative;
			padding: 0 1.5rem;
			display: flex;
			align-items: center;

			&:not(:first-child) {
				padding-left: 0.25rem;
			}

			&::after {
				position: absolute;
				content: "";
				right: 0;
				height: 1.5rem;
				width: 1px;
				background-color: var(--border-subtle);
			}

			> a {
				white-space: nowrap;
				text-decoration: none;
				font-size: 0.875rem;
				font-weight: 600;
			}
		}

		nav {
			padding-left: 1rem;
			display: flex;
			flex: 1;
		}

		> .actions {
			display: flex;
		}
	}
</style>
