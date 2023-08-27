<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import ResizablePanes from "./ResizablePanes.svelte";
</script>

<Meta
	title="Experimental/Resizable Panes"
	component={ResizablePanes}
	parameters={{ layout: "fullscreen" }}
	argTypes={{
		orientation: { control: { type: "inline-radio" }, options: ["landscape", "portrait"] },
	}}
/>

<Story id="resizablepanes" name="ResizablePanes" let:args={{ orientation, nbPanes }}>
	<ResizablePanes {orientation} {nbPanes}>
		<!-- <article>1</article>
		<article>2</article>
		<article> -->
		<ResizablePanes orientation={orientation === "landscape" ? "portrait" : "landscape"}>
			Col 3
			<!-- <article>3</article>
				<article>4</article>
				<article>5</article> -->
		</ResizablePanes>
		<!-- </article> -->
	</ResizablePanes>
</Story>

<style>
	:global(#storybook-root) {
		width: 100vw;
		height: 100vh;
	}
</style>
