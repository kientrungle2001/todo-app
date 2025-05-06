// components/grid/detail/renderer/useDefaultFilters.ts
import { TableGridDetail } from "../../TableGrid";

export const useDefaultFilters = (
  detail: TableGridDetail,
  itemId: number,
  item: any
): Record<string, any> => {
  if (!item) return {};

  if (typeof detail.customFilters === "function") {
    return detail.customFilters(item);
  }

  return {
    [detail.referenceField as string]: itemId,
  };
};
