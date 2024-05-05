<script lang="ts">
  import logo from '$lib/assets/logo.svg';
  import Plinko from '$lib/components/Plinko';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="min-h-dvh w-full">
  <nav class="sticky top-0 z-10 w-full bg-gray-700 px-5 drop-shadow-lg">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between">
      <img src={logo} alt="logo" class="h-7" />
    </div>
  </nav>
  <div class="px-5">
    <div class="mx-auto mt-5 min-w-[300px] max-w-xl md:mt-10 lg:max-w-7xl">
      <div class="flex flex-col-reverse overflow-hidden rounded-lg lg:w-full lg:flex-row">
        <Sidebar />
        <div class="flex-1">
          <Plinko />
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
