import { LOCAL_STORAGE_KEY } from '$lib/constants/game';
import { balance } from '$lib/stores/game';
import { get } from 'svelte/store';

export function setBalanceFromLocalStorage() {
  const balanceVal = window.localStorage.getItem(LOCAL_STORAGE_KEY.BALANCE);
  if (balanceVal) {
    balance.set(parseFloat(balanceVal));
  }
}

export function writeBalanceToLocalStorage() {
  const balanceVal = get(balance).toFixed(2);
  window.localStorage.setItem(LOCAL_STORAGE_KEY.BALANCE, balanceVal);
}
