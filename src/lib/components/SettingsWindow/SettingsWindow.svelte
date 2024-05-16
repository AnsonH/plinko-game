<script lang="ts">
  import { isGameSettingsOpen } from '$lib/stores/layout';
  import { isAnimationOn } from '$lib/stores/settings';
  import { hasPreferReducedMotion } from '$lib/utils/settings';
  import { Label } from 'bits-ui';
  import GearSix from 'phosphor-svelte/lib/GearSix';
  import { onMount } from 'svelte';
  import { DraggableWindow, Switch } from '../ui';

  onMount(() => {
    if (hasPreferReducedMotion()) {
      $isAnimationOn = false;
    }
  });
</script>

{#if $isGameSettingsOpen}
  <DraggableWindow
    onClose={() => ($isGameSettingsOpen = false)}
    class="fixed bottom-8 left-8 w-[18rem]"
  >
    <svelte:fragment slot="title">
      <GearSix weight="fill" class="text-xl text-slate-300" />
      <p class="text-sm font-medium text-white">Game Settings</p>
    </svelte:fragment>

    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <Switch id="isAnimationOn" bind:checked={$isAnimationOn} />
        <Label.Root for="isAnimationOn" class="text-sm  text-white">Animations</Label.Root>
      </div>
    </div>
  </DraggableWindow>
{/if}
