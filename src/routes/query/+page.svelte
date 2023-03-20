<!--
TODO:
- Validate query filters
-->
<script lang="ts">
	import { Accordion, AccordionItem, CodeBlock, SlideToggle } from '@skeletonlabs/skeleton';
	import { relayInit, type Relay, type Sub, type Event as NostrEvent } from 'nostr-tools';
	import { onMount } from 'svelte';
	import debounce from 'just-debounce-it';
	import SearchSelect from '$components/SearchSelect.svelte';
	import { RELAYS } from '$lib/constants';

	type RelayState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
	type SubState = 'unsubscribed' | 'subscribed' | 'receiving' | 'eose';

	$: relayUrl = '';
	$: state = 'disconnected' as RelayState;
	$: accordionAutoExpand = true;
	$: accordionOpenAll = true;
	$: response = [] as NostrEvent[];
	$: query = '';
	$: sub = undefined as Sub | undefined;
	$: exampleFilters = `[{"authors": ["63c3f814e38f0b5bd64515a063791a0fdfd5b276a31bae4856a16219d8aa0d1f"], "kinds": [0]}]`;
	$: isQueryStrValid = true;
	$: subState = 'unsubscribed' as SubState;
	$: formattedQuery = '';
	$: parsedQuery = undefined;
	$: {
		query && parseQuery(query);
		subState = 'unsubscribed';
	}

	let relay: Relay;

	function useExampleQueryFilters() {
		query = exampleFilters;
	}

	function setupRelay() {
		try {
			console.log('Setting up relay', relayUrl);
			relay = relayInit(relayUrl);
			relay.on('connect', () => {
				state = 'connected';
			});
			relay.on('disconnect', () => {
				state = 'disconnected';
				subState = 'unsubscribed';
			});
			relay.on('error', (e: any) => {
				console.error(e);
			});
		} catch (e) {
			state = 'disconnected';
			subState = 'unsubscribed';
			console.error('yo', e);
		}
	}

	function disconnect() {
		state = 'disconnecting';
		subState = 'unsubscribed';
		sub?.unsub();
		relay.close();
	}

	const connect = debounce(
		async () => {
			state = 'connecting';
			try {
				await relay.connect();
			} catch (e) {
				state = 'disconnected';
			}
		},
		500,
		true
	);

	function reconnect() {
		disconnect();
		setupRelay();
		connect();
	}

	onMount(() => {
		setupRelay();
		connect();
	});

	function parseQuery(query: string) {
		try {
			// response = [];
			parsedQuery = JSON.parse(query.trim());
			formattedQuery = JSON.stringify(parsedQuery, null, 2);
			isQueryStrValid = true;
		} catch (e) {
			console.error(e);
			isQueryStrValid = false;
		}
	}

	function stopSubscription() {
		sub && sub.unsub();
		subState = 'unsubscribed';
	}

	function subscribe() {
		subState = 'unsubscribed';
		if (!parsedQuery) return;
		sub && sub.unsub();
		response = [];
		sub = relay.sub(parsedQuery);
		subState = 'subscribed';
		sub.on('event', (event: NostrEvent) => {
			console.log('event', event);
			subState = 'receiving';
			response = [...response, event];
		});
		sub.on('eose', () => {
			subState = 'eose';
			console.log('eose');
		});
	}

	function onInputRelay(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		relayUrl = value;
		reconnect();
	}

	function onSelectRelay(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		relayUrl = value;
		reconnect();
	}

	function reset() {
		relayUrl = '';
		disconnect();
	}
</script>

<div class="">
	<div class="md:grid md:grid-cols-2 h-screen">
		<div class="card p-5 col-span-1 md:overflow-y-auto md:max-h-screen flex flex-col">
			<div class="space-y-5 flex-1">
				<p>
					Query nostr relays using <a href="https://github.com/nbd-wtf/nostr-tools">nostr-tools</a> filters.
				</p>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span>1. Pick Relay:</span>
					<SearchSelect
						onSelect={onSelectRelay}
						onInput={onInputRelay}
						onCancel={reset}
						options={RELAYS}
						value={relayUrl}
					/>
					{#if state == 'connected'}
						<p class="text-green-400">🌍 Connected</p>
					{:else if relayUrl.length > 0 && (state == 'disconnected' || state == 'disconnecting')}
						<p class="text-red-400">❌ Not connected</p>
					{:else if state == 'connecting'}
						<p>Connecting...</p>
					{/if}
				</label>
				<label>
					<span>2. Filters:</span>
					<textarea
						rows="5"
						bind:value={query}
						spellcheck="false"
						class="input"
						placeholder={`eg. [{"kinds": [0]}]`}
					/>
					{#if query && !isQueryStrValid}
						<p class="text-red-400">Invalid json format</p>
					{/if}
				</label>
				<div class="text-center">
					<button
						class="text-tertiary-500 hover:text-tertiary-400"
						on:click={useExampleQueryFilters}>Paste example filters</button
					>
				</div>
				{#if subState == 'receiving'}
					<button on:click={stopSubscription} type="button" class="btn w-full variant-filled-error"
						>🛑 &nbsp; Stop</button
					>
				{:else}
					<button
						disabled={state !== 'connected' || !isQueryStrValid || !query}
						on:click={subscribe}
						type="button"
						class="btn variant-filled w-full">▶️ &nbsp; Run query</button
					>
				{/if}
				{#if subState == 'subscribed'}
					<p>⏳ Subscribed, waiting to receive...</p>
				{:else if subState == 'receiving'}
					<p>⬇️ Receiving...</p>
				{:else if subState == 'eose'}
					<p class="text-green-400">🎉 Finished</p>
				{/if}
				{#if isQueryStrValid && query.length > 0}
					<CodeBlock language="json" code={formattedQuery} />
				{/if}
				<div class="text-xs flex justify-center pt-5">
					Made with 🐨 by &nbsp;<a href="https://twitter.com/LightningK0ala" target="_blank"
						>Lightning K0ala</a
					>
				</div>
			</div>
		</div>
		{#if response.length > 0}
			<div class="card p-5 space-y-5 col-span-1 overflow-y-auto max-h-screen">
				<h3>Response ({response.length} events)</h3>
				<!-- NOTE: Appending [...new, existing] is expensive -->
				<!-- and ordering on every update would also suck. -->
				<!-- need another way to do this efficiently if we want reverse order -->
				<!-- <p>Events are shown in order received.</p> -->
				<SlideToggle
					active="bg-primary-500"
					name="slider-label"
					size="sm"
					type="checkbox"
					bind:checked={accordionOpenAll}>Expand All</SlideToggle
				>
				<Accordion {accordionAutoExpand}>
					{#each response as event, i}
						<!-- <h3>Event #{i}</h3>
						<CodeBlock language="json" code={JSON.stringify(event, null, 2)} /> -->
						<AccordionItem open={accordionOpenAll} class="border border-primary-900 rounded shadow">
							<svelte:fragment slot="lead" />
							<svelte:fragment slot="summary">Event #{i}</svelte:fragment>
							<svelte:fragment slot="content">
								<CodeBlock language="json" code={JSON.stringify(event, null, 2)} />
							</svelte:fragment>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center flex-1 p-10">
				Magic will happen here ✨
			</div>
		{/if}
	</div>
</div>
