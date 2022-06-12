export interface IMenuItem {
  label: string,
  path?: (params?: any) => string,
  children?: IMenuItem[],
  icon?: string,
  customLabel?: string;
  customTooltip?: string;
}