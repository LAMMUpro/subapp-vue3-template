import { computed, ref } from 'vue';

export const appPageLoading = ref(false);

/** 是否移动端尺寸(小于等于768px) */
export const isPhone = ref(window.rawWindow?._isPhone_ ?? false);

/** 是否桌面端尺寸(大于768px) */
export const isDesktop = computed(() => !isPhone.value);
