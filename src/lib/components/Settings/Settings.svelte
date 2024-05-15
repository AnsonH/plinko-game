<script lang="ts">
  import { isGameSettingsOpen } from '$lib/stores/layout';
  import GearSix from 'phosphor-svelte/lib/GearSix';
  import { DraggableWindow } from '../ui';
</script>

<DraggableWindow
  onClose={() => ($isGameSettingsOpen = false)}
  class="fixed bottom-8 left-8 w-[18rem]"
>
  <svelte:fragment slot="title">
    <GearSix weight="fill" class="text-xl text-slate-300" />
    <p class="text-sm font-medium text-white">Game Settings</p>
  </svelte:fragment>

  <div class="flex flex-col gap-4">TODO</div>
</DraggableWindow>
