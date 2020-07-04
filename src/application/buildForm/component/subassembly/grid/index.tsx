import * as React from 'react';
import classNames from 'classnames';
import {Col, Grid, Row} from 'rsuite';
import {ReactSortable} from 'react-sortablejs';
import './index.scss'
import {Itype} from '../../../types';
import Listener from '../../../listenner';
import nanoid from 'nanoid';


export const ColCustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    return <div ref={ref} className={'app-from-subassembly-grid app-from-subassembly-grid-col'}>{props.children}</div>;
});

export const ColContainer: React.FC<any> = (props: { originallist: Array<any>, datas: any, style?: any, onRefresh?(): void }) => {
    const {datas, originallist, onRefresh, style} = props
    const [datasItem, setDatasItem] = React.useState(datas)
    const [list, setList] = React.useState(datas?.children ?? [])
    React.useEffect(() => {
        console.log('ColContainer-useEffect')
        datas.children = list.concat()
        onRefresh?.()
    }, [list])
    return (
        <Col {...datasItem.properties} style={{...style}}>
            <div form-id={datasItem.id} onClick={(event: any) => {
                event.stopPropagation();
                Listener.EmitControllerClick({
                    list,
                    item: datasItem,
                    callbackUpdate: () => {
                        setDatasItem?.(Object.assign({}, datasItem))
                    }
                })
            }}>
                <ReactSortable
                    tag={ColCustomComponent}
                    list={list}
                    group={{
                        name: Itype.Shared,
                        pull: true,
                        put: [Itype.Shared, Itype.Col, Itype.Grid, Itype.Control]
                    }}
                    animation={500}
                    delay={1}
                    swapThreshold={0.68}
                    fallbackOnBody={true}
                    invertSwap={true}
                    onUpdate={(evt, sortable, store) => {
                        store['useEvt'] = 'onUpdate'
                    }}
                    onAdd={(evt, sortable, store) => {
                        store['useEvt'] = 'onAdd'
                    }}
                    onRemove={((evt, sortable, store) => {
                        store['useEvt'] = 'onRemove'
                    })}
                    setList={((newState, sortable, store) => {
                        console.log('ColContainer', list.length, newState.length)
                        if (sortable && store?.dragging) {
                            if (['onAdd', 'onUpdate', 'onRemove'].indexOf(store['useEvt']) > -1) {
                                setList?.(newState)
                            }
                        }
                    })}
                >
                    {list?.map((item: any) => (
                        <div form-id={item.id}
                             className={classNames({
                                 'app-from-subassembly-grid-item': true,
                                 'hide': item?.controls?.() === undefined
                             })}
                             onClick={(event: any) => {
                                 event.stopPropagation();
                                 Listener.EmitControllerClick({
                                     list,
                                     item,
                                     callbackUpdate: () => {
                                         onRefresh?.()
                                     }
                                 })
                             }}
                        >
                            {item?.controls?.(originallist, item, onRefresh)}
                        </div>
                    ))}
                </ReactSortable>
            </div>
        </Col>
    )
}

export const RowCustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <div ref={ref} className={'app-from-subassembly-grid app-from-subassembly-grid-row'}>
            {props.children}
        </div>
    );
});

export const RowContainer: React.FC<any> = (props: { originallist: Array<any>, datas: any, onRefresh?(): void }) => {
    const {datas, originallist, onRefresh} = props
    const [list, setList] = React.useState(datas?.children ?? [])
    React.useEffect(() => {
        console.log('RowContainer-useEffect')
        datas.children = list.concat()
    }, [list])
    return (
        <>
            <ReactSortable
                tag={RowCustomComponent}
                list={list}
                group={{
                    name: Itype.Row,
                    pull: true,
                    put: [Itype.Row]
                }}
                animation={500}
                delay={1}
                swapThreshold={0.68}
                invertedSwapThreshold={1}
                emptyInsertThreshold={10}
                fallbackOnBody={true}
                invertSwap={true}
                onUpdate={(evt, sortable, store) => {
                    store['useEvt'] = 'onUpdate'
                }}
                onAdd={(evt, sortable, store) => {
                    store['useEvt'] = 'onAdd'
                }}
                onRemove={((evt, sortable, store) => {
                    store['useEvt'] = 'onRemove'
                })}
                setList={((newState, sortable, store) => {
                    console.log('RowContainer', list.length, newState.length)
                    if (sortable && store?.dragging) {
                        if (['onAdd', 'onUpdate', 'onRemove'].indexOf(store['useEvt']) > -1) {
                            setList?.(newState)
                            store['useEvt'] = ''
                        }
                    }
                })}
            >
                {
                    list?.map((k: any, i: any, a: any) => (
                        <div form-id={k?.id}
                             key={k?.id ?? nanoid()}
                             onClick={(event: any) => {
                                 event.stopPropagation();
                                 //Group
                                 Listener.EmitControllerClick({
                                     list,
                                     item: k,
                                     callbackUpdate: () => {
                                         onRefresh?.();
                                     }
                                 })
                             }}>
                            <Row {...k.properties}>
                                {
                                    k?.children?.map((k1: any, i1: any, a1: any) => (
                                        <ColContainer key={k1?.id} originallist={originallist} datas={k1}
                                                      onRefresh={onRefresh}/>
                                    ))
                                }
                            </Row>
                        </div>
                    ))
                }
            </ReactSortable>
        </>
    )
}

interface IProps {

    list: Array<any>

    item: any

    onRefresh?(): void
}

/**
 *
 * @author lk
 * @date 2020/7/1 09:33
 * @version 1.0
 */
export default class index extends React.Component<IProps, any> {

    public render() {
        const {list, item, onRefresh} = this.props
        return (
            <Grid fluid={true}>
                <RowContainer originallist={list} datas={item.children} onRefresh={onRefresh}/>
            </Grid>
        )
    }
}
