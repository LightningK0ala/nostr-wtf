<script lang="ts">
	import Credits from '$components/Credits.svelte';
	import { clipboard, Toast, toastStore } from '@skeletonlabs/skeleton';
	import { nip19 } from 'nostr-tools';
	import type { ProfilePointer } from 'nostr-tools/lib/nip19';

	$: input = '';
	$: pk = '';
	$: npub = '';
	$: result = ['82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2'] as string[];
	$: nprofile = '';
	$: relays = [];
	$: copied = [] as string[];
	$: hasError = false;

	function decode(str: string) {
		try {
			const result = nip19.decode(str);
			return result.data;
		} catch (e) {
			hasError = true;
			toastStore.trigger({
				message: 'Error decoding key',
				background: 'variant-filled-error'
			});
			console.error(e);
			return '';
		}
	}

	function convertPktoNpub() {
		try {
			npub = nip19.npubEncode(input);
			nprofile = nip19.nprofileEncode({ pubkey: input, relays });
		} catch (e) {
			hasError = true;
			toastStore.trigger({
				message: 'Error converting pubkey',
				background: 'variant-filled-warning'
			});
			console.error(e);
		}
	}

	function onInputPk() {
		hasError = false;
		result = [];
		if (input.length === 0) return;
		try {
			switch (true) {
				case input.startsWith('npub'):
					pk = decode(input) as string;
					result.push(pk);
					break;
				case input.startsWith('nprofile'):
					const d = decode(input) as ProfilePointer;
					result.push(d.pubkey);
					if (d.relays) {
						result.push(d.relays?.join('\n'));
					}
					break;
				default:
					npub = nip19.npubEncode(input);
					nprofile = nip19.nprofileEncode({ pubkey: input, relays });
					result.push(npub);
					result.push(nprofile);
					break;
			}
		} catch (e) {
			hasError = true;
			console.error(e);
			toastStore.trigger({
				message: 'Error converting pubkey',
				background: 'variant-filled-warning'
			});
		}
	}

	function onCopy(str: string) {
		copied = [...copied, str];
		setTimeout(() => {
			copied = copied.filter((s) => s !== str);
		}, 1000);
	}
</script>

<div class="flex flex-col h-screen w-screen sm:items-center sm:justify-center p-5">
	<div class="flex-1 space-y-5 w-full max-w-[800px]">
		<h1 class="gradient-heading">Nostr WTF</h1>
		<p>Convert your nostr keys between hex, npub and nprofile formats. 🔑 🔁 🗝️</p>
		<p>Note that converting into nprofile doesn't include relays.</p>
		<label class="label mt-2">
			<input
				bind:value={input}
				on:input={onInputPk}
				class="input text-center w-full"
				type="text"
				placeholder="Paste hex, npub or nprofile key here"
			/>
		</label>

		{#if hasError}
			Error 😢
		{:else if result.length > 0}
			<h3>Result</h3>
			{#each result as r}
				<div class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
					<div class="card flex-1">
						<div class="p-5 select-all break-all">
							{@html r}
						</div>
					</div>
					<button
						type="button"
						class="btn variant-filled-primary"
						on:click={() => onCopy(r)}
						use:clipboard={r}
						disabled={copied.includes(r)}
					>
						{copied.includes(r) ? 'Copied' : 'Copy'}
					</button>
				</div>
			{/each}
		{/if}
	</div>
	<div class="flex flex-col text-center p-5 mt-5">
		<Credits />
	</div>
</div>
