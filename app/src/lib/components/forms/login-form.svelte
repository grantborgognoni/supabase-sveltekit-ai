<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let email: string = $state('');
	let password: string = $state('');
	let loading: boolean = $state(false);

	async function handleLogin() {
		loading = true;
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			toast.error(error.message);
		} else {
			goto('/account');
		}
		loading = false;
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="m@example.com" required bind:value={email} />
			</div>
			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>
					<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
				</div>
				<Input id="password" type="password" required bind:value={password} />
			</div>
			<Button type="submit" class="w-full" onclick={handleLogin} disabled={loading}>
				{loading ? 'Logging in...' : 'Login'}
			</Button>
			<Button variant="outline" class="w-full">Login with Google</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="##" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root>
