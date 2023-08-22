<script lang="ts">
	import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
	import Button from "../basic/Button.svelte";
	import AnchoredPopover from "./AnchoredPopover.svelte";
	import type { ComponentProps } from "svelte";

	type Position = ComponentProps<AnchoredPopover>["position"];
	const positionOptions: Position[] = ["top-left", "top-right"];
	let position: Position = "top-left";
</script>

<Meta
	title="Experimental/AnchoredPopover"
	component={AnchoredPopover}
	argTypes={{
		position: { control: { type: "inline-radio" }, options: positionOptions },
		closeOnClickOutside: { control: { type: "boolean" } },
	}}
	parameters={{ layout: "fullscreen" }}
/>

<Story id="anchoredPopover" name="AnchoredPopover">
	<main>
		<p>
			Sint dolore enim nostrud tempor Lorem nulla aliqua pariatur sint non ut nisi ex deserunt. Sint
			amet labore proident velit. Magna culpa exercitation aliqua aliqua est Lorem ex. Aliqua
			aliquip Lorem adipisicing ex dolore culpa dolor mollit deserunt dolore pariatur nostrud
			proident fugiat. Non enim ut dolore velit anim cillum aliquip amet qui et duis velit commodo
			elit. Est consectetur fugiat consectetur cillum officia in ex. Laborum tempor occaecat non
			dolor mollit mollit laboris. Laborum mollit consequat quis consequat. Quis cillum aute cillum
			enim Lorem aute. Minim cupidatat est sunt culpa excepteur laboris aliquip. Reprehenderit
			consequat cillum dolore Lorem aliquip magna officia amet reprehenderit. Amet sunt exercitation
			aliquip dolore sit adipisicing. Exercitation enim pariatur exercitation fugiat ipsum deserunt.
			Nisi elit laborum ut nulla laborum non adipisicing magna anim tempor. Fugiat in enim labore
			reprehenderit cupidatat consectetur quis labore aliqua sit magna excepteur. Eu adipisicing
			dolor laboris do exercitation amet minim proident excepteur ipsum Lorem culpa Lorem proident.
			Dolore qui velit mollit aliqua. Dolor nulla commodo qui elit quis eiusmod nostrud esse velit
			aliqua. Laboris tempor non aliquip aute aliqua sit occaecat id veniam dolor. Consectetur minim
			consequat eu laboris dolore laboris non fugiat consectetur ullamco incididunt duis qui
			nostrud. Aliquip dolor eiusmod tempor ex mollit sit reprehenderit. Magna aute nulla
			consectetur aliqua duis cillum. Ex ea duis eiusmod deserunt consequat in excepteur eu do
			officia laboris id incididunt esse. Velit pariatur laboris excepteur mollit nostrud. Voluptate
			ipsum ullamco minim veniam veniam eiusmod occaecat. Velit esse non qui aliqua sit sunt veniam
			aute. Tempor proident deserunt exercitation exercitation qui duis magna velit ea. Anim dolore
			minim eiusmod aliquip dolore sint cupidatat id minim commodo veniam quis ad. Tempor minim
			exercitation officia pariatur esse ex dolore in ea. Officia laboris veniam sunt eu esse dolor
			veniam laboris pariatur anim tempor quis duis consequat. Nulla sunt magna ea sint laboris ad
			aliqua minim occaecat proident voluptate occaecat. Velit ullamco ut eu laboris anim minim
			deserunt Lorem laboris ut consectetur velit. Excepteur enim fugiat et anim exercitation
			laborum pariatur labore occaecat sunt.
		</p>
		<Button label="Click on me!" />
		<AnchoredPopover {position} let:hidePopover>
			<button class="popover-button" on:click={hidePopover}>Click on me!</button>
			<p class="popover-content">
				Nulla reprehenderit dolor duis Lorem Lorem laboris sit. Adipisicing nisi officia qui duis
				voluptate ea quis amet commodo. Est esse proident proident minim.
			</p>
		</AnchoredPopover>
		<p>
			Veniam cillum non excepteur consectetur nisi velit ad incididunt veniam in. Voluptate id id in
			adipisicing veniam laboris cillum aliqua dolor reprehenderit. Aliqua exercitation culpa
			nostrud est voluptate Lorem est proident reprehenderit laborum nulla. Dolor nulla velit
			laborum consequat consequat consequat aute. Elit aute veniam ea pariatur mollit. Pariatur est
			labore velit nulla sit mollit ipsum cillum qui laborum reprehenderit. Nulla eiusmod ullamco
			proident ut ipsum dolor pariatur anim eu cupidatat dolor. Excepteur velit ex exercitation qui
			voluptate dolor anim dolore pariatur irure exercitation aliqua. Tempor quis quis reprehenderit
			exercitation magna exercitation laboris ut nisi enim laborum duis minim nisi. Consectetur
			pariatur quis eiusmod aute in consequat quis laborum est. Occaecat officia non nulla officia
			irure. Aute sint non nostrud minim incididunt sit sit adipisicing sit. Dolor proident et enim
			Lorem veniam reprehenderit elit. Magna anim exercitation aute voluptate cupidatat non ex
			incididunt elit. Occaecat magna aliquip aliqua elit Lorem excepteur eiusmod officia anim
			commodo aliquip do. Sunt minim fugiat ut ex quis cupidatat ex aliquip proident id id ullamco
			sunt. Velit mollit quis ea consectetur veniam aliquip occaecat do commodo nostrud et et. Id
			dolore enim deserunt qui occaecat irure id ullamco in sunt et nulla magna aliqua. Enim irure
			excepteur consectetur anim ullamco enim id magna. Deserunt voluptate fugiat consequat id eu
			quis qui minim cillum eu qui in Lorem sit. Quis anim nostrud fugiat excepteur enim sint elit
			dolore. Consectetur ea adipisicing et anim ipsum. Pariatur officia reprehenderit incididunt
			amet commodo esse esse officia commodo eiusmod.
		</p>
	</main>
</Story>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		height: 100vh;
		padding: 1rem;
		overflow: auto;

		> * {
			flex-shrink: 0;
		}

		> :global(button) {
			align-self: center;
		}

		.popover-button {
			height: 2.5rem;
			display: inline-flex;
			align-items: center;
			gap: 1rem;
			cursor: pointer;
			font-size: 0.875rem;
			white-space: nowrap;
			border: none;
			padding: 0 1rem;
			border: 1px solid transparent;
			background: var(--layer-1);
		}

		.popover-content {
			padding: 1rem;
			background: var(--layer-1);
			width: 30ch;
			overflow: hidden;
		}
	}
</style>
