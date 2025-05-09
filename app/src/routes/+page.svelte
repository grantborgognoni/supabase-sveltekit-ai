<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Button onclick={() => goto('/auth/login')}>Login</Button>
	<Button onclick={() => goto('/auth/signup')}>Signup</Button>
</div>
