<script lang="ts">
	export let name: string | undefined = undefined;
	export let disabled = false;
</script>

<input {name} {disabled} on:change />
