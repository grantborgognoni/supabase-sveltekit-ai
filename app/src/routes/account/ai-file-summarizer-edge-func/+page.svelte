<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';

	let files: FileList | null = $state(null);
	let dragOver = $state(false);
	let fileName = $state('');
	let summary = $state('');
	let isLoading = $state(false);

	function handleFiles(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement.files && inputElement.files.length > 0) {
			files = inputElement.files;
			fileName = files[0].name;
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;

		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			files = event.dataTransfer.files;
			fileName = files[0].name;
		}
	}

	async function summarizeFile() {
		if (!files || files.length === 0) return;

		isLoading = true;
		summary = ''; // Clear previous summary

		try {
			// Here you would send the file to your backend API for summarization
			// For now, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Placeholder summary text (replace with actual API call result)
			summary = `This is an AI-generated summary of "${fileName}".\n\nThe document contains information about [topic], discussing key points such as [point 1], [point 2], and [point 3]. The main conclusion is that [conclusion].`;
		} catch (error) {
			console.error('Error summarizing file:', error);
			summary = 'An error occurred while summarizing the file. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	function resetForm() {
		files = null;
		fileName = '';
		summary = '';
	}
</script>

<div class="container mx-auto py-8">
	<h1 class="mb-6 text-3xl font-bold">AI File Summarizer</h1>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- File Upload Section -->
		<Card>
			<CardHeader>
				<CardTitle>Upload File</CardTitle>
				<CardDescription>Upload a document to get an AI-generated summary</CardDescription>
			</CardHeader>
			<CardContent>
				<!-- Drag and drop area -->
				<div
					aria-label="Drag and drop area"
					class={cn(
						'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
						dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
						files && files.length > 0 ? 'bg-primary/5' : ''
					)}
					ondragover={handleDragOver}
					ondragleave={handleDragLeave}
					ondrop={handleDrop}
					onclick={() => document.getElementById('file-input')?.click()}
					onkeydown={(e) => e.key === 'Enter' && document.getElementById('file-input')?.click()}
					tabindex="0"
					role="button"
				>
					<div class="flex flex-col items-center justify-center gap-2">
						{#if files && files.length > 0}
							<div class="text-xl font-medium">File selected:</div>
							<div class="text-muted-foreground">{fileName}</div>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="text-muted-foreground h-10 w-10"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<div class="text-xl font-medium">Drag & Drop your file here</div>
							<div class="text-muted-foreground">or click to browse</div>
						{/if}
					</div>
					<Input
						id="file-input"
						type="file"
						class="hidden"
						onchange={handleFiles}
						accept=".txt,.pdf,.doc,.docx"
					/>
				</div>
			</CardContent>
			<CardFooter class="flex justify-between">
				<Button variant="outline" onclick={resetForm}>Reset</Button>
				<Button onclick={summarizeFile} disabled={!files || isLoading}>
					{#if isLoading}
						<svg
							class="-ml-1 mr-2 h-4 w-4 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Summarizing...
					{:else}
						Summarize
					{/if}
				</Button>
			</CardFooter>
		</Card>

		<!-- Summary Section -->
		<Card>
			<CardHeader>
				<CardTitle>File Summary</CardTitle>
				<CardDescription>AI-generated summary of your document</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea
					placeholder="The summary will appear here after you upload and summarize a file"
					rows={12}
					value={summary}
					readonly
					class="resize-none"
				/>
			</CardContent>
		</Card>
	</div>
</div>
