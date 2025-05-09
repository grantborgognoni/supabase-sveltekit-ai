<script lang="ts" module>
	// sample data
	const data = {
		navMain: [
			{
				title: 'Main',
				url: '#',
				items: [
					{
						title: 'Dashboard',
						url: '/account'
					}
				]
			},
			{
				title: 'Non-RAG Tools',
				url: '#',
				items: [
					{
						title: 'File Summarizer (SvelteKit Only)',
						url: '/account/ai-file-summarizer-sveltekit-only'
					},
					{
						title: 'File Summarizer (Edge Function)',
						url: '/account/ai-file-summarizer-edge-func'
					}
				]
			},
			{
				title: 'Rag Tools',
				url: '#',
				items: [
					{
						title: 'Rag File Question Answerer',
						url: '/account/rag-file-question-answerer'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import SearchForm from '$lib/components/search-form.svelte';
	import VersionSwitcher from '$lib/components/version-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {...restProps} bind:ref>
	<Sidebar.Header>
		<SearchForm />
	</Sidebar.Header>
	<Sidebar.Content>
		<!-- We create a Sidebar.Group for each parent. -->
		{#each data.navMain as group (group.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={item?.isActive}>
									{#snippet child({ props })}
										<a href={item.url} {...props}>{item.title}</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
