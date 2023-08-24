<script lang="ts">
	import Button from "$lib/basic/Button.svelte";
	import Popover from "$lib/overlay/Popover.svelte";
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Add from "carbon-icons-svelte/lib/Add.svelte";

	const positionOptions = ["bottom-start", "bottom-end"];
</script>

<Meta
	title="Overlay/Popover"
	component={Popover}
	parameters={{ layout: "fullscreen" }}
	argTypes={{
		defaultPosition: { control: { type: "inline-radio" }, options: positionOptions },
	}}
	args={{ defaultPosition: "bottom-start" }}
/>

<Story id="popover" name="Popover" let:args>
	<main>
		<p>
			Aliquip est duis consectetur laborum ad in Lorem dolore aliqua deserunt. Ad aliqua dolor dolor
			occaecat ullamco eiusmod laborum nulla nisi. Eiusmod duis aliquip sunt in aliqua nisi elit
			aliquip laboris cupidatat.
		</p>
		<p>
			Cupidatat ex do occaecat laborum cillum eiusmod reprehenderit pariatur. Incididunt velit
			eiusmod magna dolor exercitation cupidatat incididunt. Ex Lorem quis eiusmod laborum commodo
			nulla occaecat nulla ad.
		</p>
		<p>
			Id consectetur consequat in elit adipisicing. Labore adipisicing est sunt excepteur sit duis
			veniam reprehenderit consectetur ex labore excepteur consectetur qui. Excepteur ex elit veniam
			ullamco in pariatur minim. Laborum enim laborum qui elit sint aliquip ea mollit sunt duis
			incididunt id. Amet Lorem velit labore cillum aliquip non minim enim nostrud. Mollit amet elit
			duis veniam eu adipisicing elit Lorem ullamco. Adipisicing veniam do reprehenderit est
			deserunt laboris id velit sit.
		</p>
		<p>
			Proident irure ex ea ut. Amet sint ullamco laborum consequat ut voluptate reprehenderit
			eiusmod aliqua qui. Sunt consequat sit non dolore voluptate esse culpa nulla aute non do velit
			ad consequat.
		</p>
		<p>
			Amet culpa aliquip ut dolore pariatur incididunt aute laborum. Velit nostrud Lorem sunt
			ullamco laborum voluptate aute deserunt eiusmod eiusmod ea nisi sit fugiat. Minim elit ullamco
			et cillum magna duis aliquip aliqua ex consectetur mollit mollit sint. Laborum ex excepteur
			adipisicing irure dolore incididunt sit consectetur qui nisi elit qui. Elit excepteur ex dolor
			non occaecat ipsum elit eu dolor occaecat. Ullamco anim labore enim veniam elit cupidatat duis
			consequat et aliquip. Eu mollit aute commodo officia nulla laboris qui quis.
		</p>
		<p>
			Ut adipisicing eiusmod incididunt culpa fugiat culpa voluptate culpa Lorem nostrud. Cupidatat
			proident et aute elit tempor exercitation minim occaecat id velit nulla aute quis. In elit
			officia dolor nulla irure aute reprehenderit eu reprehenderit elit sit esse. Pariatur laboris
			ut laborum esse consectetur culpa non adipisicing.
		</p>
		<div class="center">
			{#each Array.from({ length: 3 }) as _}
				<Popover buttonProps={{ icon: Add, label: "New item" }} {...args}>
					<p class="popover-content">
						Nulla reprehenderit dolor duis Lorem Lorem laboris sit. Adipisicing nisi officia qui
						duis voluptate ea quis amet commodo. Est esse proident proident minim.

						<Button label="hello" />
					</p>
				</Popover>
			{/each}
		</div>
		<p>
			Aliquip est duis consectetur laborum ad in Lorem dolore aliqua deserunt. Ad aliqua dolor dolor
			occaecat ullamco eiusmod laborum nulla nisi. Eiusmod duis aliquip sunt in aliqua nisi elit
			aliquip laboris cupidatat.
		</p>
		<p>
			Cupidatat ex do occaecat laborum cillum eiusmod reprehenderit pariatur. Incididunt velit
			eiusmod magna dolor exercitation cupidatat incididunt. Ex Lorem quis eiusmod laborum commodo
			nulla occaecat nulla ad.
		</p>
		<p>
			Id consectetur consequat in elit adipisicing. Labore adipisicing est sunt excepteur sit duis
			veniam reprehenderit consectetur ex labore excepteur consectetur qui. Excepteur ex elit veniam
			ullamco in pariatur minim. Laborum enim laborum qui elit sint aliquip ea mollit sunt duis
			incididunt id. Amet Lorem velit labore cillum aliquip non minim enim nostrud. Mollit amet elit
			duis veniam eu adipisicing elit Lorem ullamco. Adipisicing veniam do reprehenderit est
			deserunt laboris id velit sit.
		</p>
		<p>
			Proident irure ex ea ut. Amet sint ullamco laborum consequat ut voluptate reprehenderit
			eiusmod aliqua qui. Sunt consequat sit non dolore voluptate esse culpa nulla aute non do velit
			ad consequat.
		</p>
		<p>
			Amet culpa aliquip ut dolore pariatur incididunt aute laborum. Velit nostrud Lorem sunt
			ullamco laborum voluptate aute deserunt eiusmod eiusmod ea nisi sit fugiat. Minim elit ullamco
			et cillum magna duis aliquip aliqua ex consectetur mollit mollit sint. Laborum ex excepteur
			adipisicing irure dolore incididunt sit consectetur qui nisi elit qui. Elit excepteur ex dolor
			non occaecat ipsum elit eu dolor occaecat. Ullamco anim labore enim veniam elit cupidatat duis
			consequat et aliquip. Eu mollit aute commodo officia nulla laboris qui quis.
		</p>
		<p>
			Ut adipisicing eiusmod incididunt culpa fugiat culpa voluptate culpa Lorem nostrud. Cupidatat
			proident et aute elit tempor exercitation minim occaecat id velit nulla aute quis. In elit
			officia dolor nulla irure aute reprehenderit eu reprehenderit elit sit esse. Pariatur laboris
			ut laborum esse consectetur culpa non adipisicing.
		</p>
	</main>
</Story>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100vh;
		overflow: auto;
		padding: 1rem;

		> * {
			flex-shrink: 0;
		}

		> .center {
			display: flex;
			justify-content: space-between;
		}

		.popover-content {
			padding: 1rem;
			width: 30ch;
			overflow: hidden;
		}
	}
</style>
