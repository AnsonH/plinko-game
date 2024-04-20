<script lang="ts">
	import Plinko from '$lib/components/Plinko';

	let rows = 8;
</script>

<div>
	<Plinko {rows} />
</div>
<div class="mx-4 mt-8 flex items-center gap-8">
	<label for="rows">Rows</label>
	<input type="number" bind:value={rows} name="rows" id="rows" class="border border-gray-400 p-2" />
</div>
