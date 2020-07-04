import * as React from 'react';
import {ReactSortable} from 'react-sortablejs';
import './index.scss'
import Listener from '../../listenner';
import {Itype} from '../../types';
import {Form} from 'rsuite';


export const CustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    return <div ref={ref} className={'app-from-left-controller-group-panle'}>{props.children}</div>;
});

export const Container: React.FC<any> = (props: { datas: any, onRefresh?(): void, onChange?(ata: any): void }) => {
    const {datas, onChange, onRefresh} = props
    const [list, setList] = React.useState<Array<any>>(datas)
    React.useEffect(() => {
        console.log('Container-useEffect')
        onChange?.(list.concat())
    }, [list])
    return (
        <ReactSortable
            tag={CustomComponent}
            list={list}
            group={{
                name: Itype.Shared,
                pull: true,
                put: [Itype.Shared, Itype.Grid]
            }}
            animation={500}
            delay={1}
            swapThreshold={0.68}
            invertedSwapThreshold={0.68}
            fallbackOnBody={true}
            invertSwap={true}
            onUpdate={(evt, sortable, store) => {
                store['useEvt'] = 'onUpdate'
            }}
            onAdd={(evt, sortable, store) => {
                store['useEvt'] = 'onAdd'
            }}
            setList={(newState, sortable, store) => {
                if (sortable && store?.dragging) {
                    if (['onAdd', 'onUpdate'].indexOf(store['useEvt']) > -1) {
                        setList?.(newState)
                    }
                }
            }}
        >
            {list?.map((item: any) => (
                <div className={'app-from-center-controller-group-item'}
                     key={item.id}
                     form-id={item.id}
                     onClick={() => {
                         Listener.EmitControllerClick({
                             list,
                             item,
                             callbackUpdate: () => {
                                 setList?.(list.concat())
                             }
                         })
                     }}
                >
                    {item?.controls?.(list, item, onRefresh)}
                </div>
            ))}
        </ReactSortable>
    )
}


interface IProps {
    formValue: Array<any>

    onRefresh?(): void

    onChange?(newState: any): void
}

/**
 *
 * @author lk
 * @date 2020/6/29 18:58
 * @version 1.0
 */
export default class CenterPanle extends React.Component<IProps> {

    public render() {
        const {formValue: list, onRefresh, onChange} = this.props
        return (
            <div className={'app-from-center-controller'}>
                <Form layout={'horizontal'} readOnly={true}>
                    <Container datas={list} onRefresh={onRefresh} onChange={onChange}/>
                </Form>
            </div>
        )
    }
}
