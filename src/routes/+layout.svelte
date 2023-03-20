<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	// Syntax highlighting
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);
</script>

<!-- App Shell -->
<AppShell>
	<Toast />
	<svelte:fragment slot="header" />
	<!-- Page Route Content -->
	<!-- <div class="p-7"> -->
	<!-- <h1 class="gradient-heading">Nostr WTF</h1> -->
	<slot />
	<!-- </div> -->
</AppShell>
