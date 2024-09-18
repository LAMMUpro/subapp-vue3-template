import { MenuItemType, UserInfoType } from '@/types/common';
import { defineStore } from 'pinia';

const useGlobalStore = defineStore({
  id: 'Store_Global',
  state: (): {
    menus: Array<MenuItemType>;
    permissions: Array<string>;
    userInfo: UserInfoType;
  } => ({
    /** 菜单 */
    menus: [],
    /** 权限 */
    permissions: [],
    /** 用户信息 */
    userInfo: {
      avatar: '',
      email: '',
      id: '',
      name: '',
      phone: '',
    },
  }),
  getters: {},
  actions: {
    updateMenu(menus: Array<MenuItemType>) {
      this.menus = menus;
    },
    updatePermissions(permissions: Array<string>) {
      this.permissions = permissions;
    },
    updateUserInfo(userInfo: UserInfoType) {
      this.userInfo = userInfo;
    },
  },
  persist: true,
});

export default useGlobalStore;
