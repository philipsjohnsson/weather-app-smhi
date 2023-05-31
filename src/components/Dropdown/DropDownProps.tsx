export interface DropDownProps {
  options: { data: any, loading: boolean, error: boolean } // { data, loading, error }
  callbackDropdownOptionPressed: (arg: string[]) => void
}
