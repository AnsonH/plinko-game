<script lang="ts">
  import Plinko from '$lib/components/Plinko';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="min-h-screen w-full">
  <nav class="sticky top-0 w-full bg-gray-700 px-5 drop-shadow-lg">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between">
      <!-- TODO: Design a logo -->
      <p class="text-2xl font-medium text-white">Plinko</p>
    </div>
  </nav>
  <div class="px-5">
    <div class="mx-auto mt-5 max-w-7xl md:mt-10">
      <div class="flex w-full overflow-hidden rounded-lg">
        <Sidebar />
        <div class="flex-1 bg-gray-900">
          <div class="mx-auto h-full max-w-[760px]">
            <Plinko />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    @apply bg-gray-800;
  }
</style>
