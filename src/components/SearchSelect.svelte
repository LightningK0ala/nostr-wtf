<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let options: string[] = [];
	export let onSelect: (value: string) => void;
	export let onInput: (e: Event) => void;
	export let onCancel: () => void;
	export let value: string;

	// This doesn't do anything but is necessary since we're hacking ListBoxItem.
	$: isPopupVisible = false;
	$: filteredOptions = options.filter((option) => option.includes(value));

	function onFocus() {
		isPopupVisible = true;
	}

	function onBlur() {
		isPopupVisible = false;
	}
</script>

<div class="flex">
	<input
		on:focus={onFocus}
		on:blur={onBlur}
		on:input={onInput}
		bind:value
		spellcheck="false"
		class="input"
		type="text"
		placeholder="eg. wss://nos.lol"
	/>
	{#if value.length > 0}
		<button on:click={onCancel} class="btn btn-icon-sm text-white">X</button>
	{/if}
</div>
{#if isPopupVisible && filteredOptions.length !== 1 && filteredOptions[0] !== value}
	<div class="border max-h-32 overflow-y-auto rounded border-surface-500">
		{#each filteredOptions as option}
			<div
				class="px-3 py-2 overflow-x-hidden hover:cursor-pointer hover:bg-surface-500"
				on:mousedown={() => onSelect(option)}
			>
				{option}
			</div>
		{/each}
	</div>
{/if}
