export interface DropDownProps {
  options: { data: any, loading: boolean, error: boolean }
  callbackDropdownOptionPressed: (arg: string[]) => void
}
