import request from '@/utils/request';

/**
 * 获取菜单树
 */
export function getMenuTree(params: any = {}) {
  return request("GET", "/menu/tree", params);
}

/**
 * 删除菜单节点
 */
export function deleteMenu(params: {
  id: string
}) {
  return request("DELETE", `/menu/${params.id}`, params);
}

/**
 * 新增菜单节点
 */
export function addMenu(params: any) {
  return request("POST", `/menu`, params);
}

/**
 * 编辑菜单节点
 */
export function updateMenu(params: any) {
  return request("PUT", `/menu/${params.id}`, params);
}