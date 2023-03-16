<script lang="ts">
	import { clipboard, Toast, toastStore } from '@skeletonlabs/skeleton';
	import { nip19 } from 'nostr-tools';
	import type { ProfilePointer } from 'nostr-tools/lib/nip19';

	$: input = '';
	$: pk = '';
	$: npub = '';
	$: result = [] as string[];
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

<div class="flex flex-col h-screen w-screen items-center justify-center space-y-5">
	<h1 class="gradient-heading">Nostr WTF</h1>
	<p>Convert your nostr keys</p>
	<p>🔑</p>
	<label class="label mt-2">
		<input
			bind:value={input}
			on:input={onInputPk}
			class="w-96 input text-center"
			type="text"
			placeholder="Paste hex, npub or nprofile key here"
		/>
	</label>

	<h3>Result</h3>
	{#if hasError || result.length == 0}
		😢
	{:else}
		{#each result as r}
			<div class="flex space-x-3">
				<div class="card">
					<div class="p-5 select-all">
						{@html r}
					</div>
				</div>
				<button
					type="button"
					class="btn variant-filled"
					on:click={() => onCopy(r)}
					use:clipboard={r}
					disabled={copied.includes(r)}
				>
					{copied.includes(r) ? 'Copied 👍' : 'Copy'}
				</button>
			</div>
		{/each}
	{/if}
	<div class="text-center p-5 mt-5">
		Made with 🐨 by <a href="https://twitter.com/LightningK0ala" target="_blank">Lightning K0ala</a>
	</div>
</div>
