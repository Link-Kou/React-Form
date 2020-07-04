export interface IFormNode {
    id: string
    name: string
    type?: 'Shared' | 'Control' | 'Grid' | 'Input'
    controls: (list: Array<any>, item: any, onRefresh?: () => void) => any
    properties?: any
    children?: Array<IFormNode> | any
}


export const Itype = {
    Shared: 'Shared',
    Grid: 'Grid',
    Row: 'Row',
    RowGroup: 'RowGroup',
    Col: 'Col',
    Control: 'Control'
}
