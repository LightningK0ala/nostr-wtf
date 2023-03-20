<!--
TODO:
- Validate query filters
-->
<script lang="ts">
	import { Accordion, AccordionItem, CodeBlock, SlideToggle } from '@skeletonlabs/skeleton';
	import { relayInit, type Relay, type Sub, type Event } from 'nostr-tools';
	import { onMount } from 'svelte';
	import debounce from 'just-debounce-it';

	const RELAYS = ['wss://nos.lol'];

	type RelayState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected';
	type SubState = 'unsubscribed' | 'subscribed' | 'receiving' | 'eose';

	$: relayUrl = '';
	$: state = 'disconnected' as RelayState;
	$: accordionAutoExpand = true;
	$: accordionOpenAll = true;
	$: response = [] as Event[];
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
		sub.on('event', (event: Event) => {
			console.log('event', event);
			subState = 'receiving';
			response = [...response, event];
		});
		sub.on('eose', () => {
			subState = 'eose';
			console.log('eose');
		});
	}
</script>

<div class="">
	<div class="grid grid-cols-2 h-screen">
		<div class="card p-5 col-span-1 overflow-y-auto max-h-screen flex flex-col">
			<div class="space-y-5 flex-1">
				<p>
					This is a simple tool to query nostr relays using <a
						href="https://github.com/nbd-wtf/nostr-tools">nostr-tools</a
					> filters formatted as json.
				</p>
				<label class="label">
					<span>1. Pick Relay:</span>
					<select bind:value={relayUrl} on:change={reconnect} class="select">
						{#each RELAYS as r}
							<option value="">Select Relay</option>
							<option value={r}>{r}</option>
						{/each}
					</select>
				</label>
				<label class="label">
					<span>2. Specify relay URL (optional):</span>
					<input
						bind:value={relayUrl}
						on:input={reconnect}
						spellcheck="false"
						class="input"
						type="text"
						placeholder="eg. wss://nos.lol"
					/>
					{#if state == 'connected'}
						<p class="text-green-400">🌍 Connected</p>
					{:else if state == 'disconnected' || state == 'disconnecting'}
						<p class="text-red-400">❌ Not connected</p>
					{:else if state == 'connecting'}
						<p>Connecting...</p>
					{/if}
				</label>
				<label>
					<span>Filters:</span>
					<textarea
						rows="5"
						bind:value={query}
						spellcheck="false"
						class="input"
						placeholder={`Paste your nostr-tools filters in json format eg.
[
    {
        "authors": ["63c3f814e38f0b5bd64515a063791a0fdfd5b276a31bae4856a16219d8aa0d1f"]
    }
]`}
					/>
					{#if query && !isQueryStrValid}
						<p class="text-red-400">Invalid json format</p>
					{/if}
				</label>
				<div class="text-center">
					<button
						class="text-tertiary-500 hover:text-tertiary-400"
						on:click={useExampleQueryFilters}>Paste example query filters</button
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
				{#if isQueryStrValid}
					<CodeBlock language="json" code={formattedQuery} />
				{/if}
			</div>
			<div class="text-xs flex justify-center">
				Made with 🐨 by &nbsp;<a href="https://twitter.com/LightningK0ala" target="_blank"
					>Lightning K0ala</a
				>
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
			<div class="flex flex-col items-center justify-center flex-1">Magic will happen here ✨</div>
		{/if}
	</div>
</div>
