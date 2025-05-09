<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { Toaster } from 'svelte-sonner';
</script>

<Toaster />
{@render children()}
