<script lang="ts">
	import Button from "$lib/basic/Button.svelte";

	export let href: string;
	export let label: string;
	export let selected = false;
</script>

<Button {href} class="navbar-item" aria-current={selected} kind="text" size="l" {label} />
