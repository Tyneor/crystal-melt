<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Resizer from "./Resizer.svelte";
</script>

<Meta
	title="Layout/Resizer"
	component={Resizer}
	parameters={{ layout: "fullscreen" }}
	argTypes={{ nbPanes: { control: { type: "number" } } }}
	args={{ nbPanes: 5 }}
/>

<Story id="resizer" name="Resizer" let:args={{ nbPanes }}>
	<main>
		{#each Array.from({ length: nbPanes }) as _, i}
			{#if i > 0}<Resizer />{/if}
			<section>{i}</section>
		{/each}
	</main>
</Story>

<style lang="scss">
	main {
		width: 100vw;
		height: 100vh;
		display: flex;

		> section {
			display: grid;
			place-items: center;
			background-color: rgb(248, 250, 252);
			min-width: 5rem;
			max-width: 30rem;
			flex: 1;
		}
	}
</style>
