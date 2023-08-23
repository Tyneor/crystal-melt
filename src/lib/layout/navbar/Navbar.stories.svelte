<script lang="ts">
	import { Meta, Story } from "@storybook/addon-svelte-csf";
	import Add from "carbon-icons-svelte/lib/Add.svelte";
	import Apple from "carbon-icons-svelte/lib/Apple.svelte";
	import Exit from "carbon-icons-svelte/lib/Exit.svelte";
	import Fish from "carbon-icons-svelte/lib/Fish.svelte";
	import Flag from "carbon-icons-svelte/lib/Flag.svelte";
	import Information from "carbon-icons-svelte/lib/Information.svelte";
	import Password from "carbon-icons-svelte/lib/Password.svelte";
	import Strawberry from "carbon-icons-svelte/lib/Strawberry.svelte";
	import UserAvatar from "carbon-icons-svelte/lib/UserAvatar.svelte";
	import Button from "$lib/basic/Button.svelte";
	import Popover from "$lib/overlay/Popover.svelte";
	import Navbar from "./index.js";
</script>

<Meta
	title="Layout/Navbar"
	component={Navbar.Root}
	parameters={{ layout: "fullscreen" }}
	argTypes={{
		titleLabel: { control: { type: "text" } },
		menuBreakpoint: { control: { type: "number" } },
		titleHref: { table: { disable: true } },
	}}
	args={{ titleLabel: "My app name" }}
/>

<Story id="navbar" name="Navbar" let:args>
	<Navbar.Root {...args}>
		<svelte:fragment slot="links">
			<Navbar.Link href={location.href} label="Link 1" />
			<Navbar.Link href={location.href} label="Link 2" selected />
			<Navbar.Menu
				label="Menu 3"
				options={[1, 2, 3].map((i) => ({ label: `Option ${i}`, href: location.href }))}
			/>
			<Navbar.Menu
				label="Market"
				selected
				options={[
					{ label: "Apple", icon: Apple, href: location.href },
					{ label: "Fish", icon: Fish, href: location.href, selected: true },
					{ label: "Strawberry", icon: Strawberry, href: location.href },
					"divider",
					{ label: "New product", icon: Add },
				]}
			/>
		</svelte:fragment>

		<svelte:fragment slot="actions">
			<Popover buttonProps={{ icon: Information, size: "l", kind: "ghost" }}>
				<div style="padding: 1rem; width: 30ch; overflow: hidden;">
					Nulla reprehenderit dolor duis Lorem Lorem laboris sit. Adipisicing nisi officia qui duis
					voluptate ea quis amet commodo. Est esse proident proident minim.
				</div>
			</Popover>
			<Popover buttonProps={{ icon: UserAvatar, size: "l", kind: "ghost" }}>
				<div style="display:flex; flex-direction:column; padding: 1rem; gap: 0.125rem;">
					<span style="font-weight:600;">Firstname LASTNAME</span>
					<span style="font-size: 0.875rem;">firstname.lastname@email.com</span>
				</div>
				<div style="display:flex;">
					<Button kind="secondary" label="Change password" strech icon={Password} />
					<Button label="Disconnect" strech icon={Exit} />
				</div>
			</Popover>
			<Button kind="ghost" size="l" icon={Flag} />
		</svelte:fragment>
	</Navbar.Root>
</Story>
