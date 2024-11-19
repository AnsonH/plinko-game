import { LOCAL_STORAGE_KEY } from '$lib/constants/game';
import { balance } from '$lib/stores/game';
import { get } from 'svelte/store';

export function setBalanceFromLocalStorage() {
  const rawValue = window.localStorage.getItem(LOCAL_STORAGE_KEY.BALANCE);
  const parsedValue = parseFloat(rawValue ?? '');
  if (!isNaN(parsedValue)) {
    balance.set(parsedValue);
  }
}

export function writeBalanceToLocalStorage() {
  const balanceVal = get(balance);
  if (!isNaN(balanceVal)) {
    const balanceValStr = balanceVal.toFixed(2);
    window.localStorage.setItem(LOCAL_STORAGE_KEY.BALANCE, balanceValStr);
  }
}
