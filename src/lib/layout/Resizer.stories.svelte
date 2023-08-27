<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Resizer from "./Resizer.svelte";
</script>

<Meta title="Layout/Resizer" component={Resizer} parameters={{ layout: "fullscreen" }} />

<Story id="resizer" name="Resizer">
	<main>
		<section>1</section>
		<Resizer />
		<section>2</section>
		<Resizer />
		<section>3</section>
		<Resizer />
		<section>4</section>
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
