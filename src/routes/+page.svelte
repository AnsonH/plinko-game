<script lang="ts">
	import Plinko from '$lib/components/Plinko';
	import { rowCountOptions } from '$lib/constants/plinko';
	import { rowCount } from '$lib/stores/game';
</script>

<div>
	<Plinko />
</div>
<div class="mx-4 mt-8 flex items-center gap-8">
	<label for="rows">Rows</label>
	<select bind:value={$rowCount} class="border border-gray-400 p-2">
		{#each rowCountOptions as rows}
			<option value={rows}>{rows}</option>
		{/each}
	</select>
</div>
