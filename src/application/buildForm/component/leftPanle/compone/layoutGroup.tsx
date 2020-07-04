import * as React from 'react';
import {ReactSortable} from 'react-sortablejs';
import {FormGrid} from '../../subassembly'
import {IFormNode, Itype} from '../../../types';
import nanoid from 'nanoid';

interface IState {
    list: Array<IFormNode>
}

/**
 *
 * @author lk
 * @date 2020/6/30 10:11
 * @version 1.0
 */
export default class LayoutGroup extends React.Component {

    public CustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
        return <div ref={ref} className={'app-from-left-controller-group-panle'}>{props.children}</div>;
    });

    private getNewData = (): any => {
        const state: IState = {
            list: [
                {
                    id: nanoid(),
                    type: 'Control',
                    name: '栅格布局',
                    controls: (list, item, onRefresh) => <FormGrid list={list}
                                                                   item={item}
                                                                   onRefresh={onRefresh}/>,
                    children: {
                        id: nanoid(),
                        type: 'Grid',
                        name: '栅格布局',
                        children: [
                            //Row
                            {
                                id: nanoid(),
                                name: '栅格布局行',
                                type: 'Row',
                                children: [
                                    //Col
                                    {
                                        id: nanoid(),
                                        name: '栅格布局列',
                                        type: 'Col',
                                        properties: {
                                            xs: 12,
                                            sm: 12,
                                            md: 12
                                        },
                                        children: []
                                    },
                                    {
                                        id: nanoid(),
                                        name: '栅格布局列',
                                        type: 'Col',
                                        properties: {
                                            xs: 12,
                                            sm: 12,
                                            md: 12
                                        },
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
        return state.list.concat()
    }

    public state: IState = {
        list: this.getNewData()
    }


    public render() {
        const {list} = this.state
        return (
            <div className={'app-from-left-controller-group'}>
                <p>布局型控件</p>
                <ReactSortable
                    tag={this.CustomComponent}
                    list={list}
                    group={{
                        name: Itype.Grid,
                        pull: 'clone',
                        put: false
                    }}
                    sort={false}
                    animation={200}
                    delay={2}
                    swapThreshold={0.68}
                    invertedSwapThreshold={0.68}
                    fallbackOnBody={true}
                    invertSwap={true}
                    setList={newState => {
                        this.setState({
                            list: this.getNewData()
                        })
                    }}
                >
                    {list.map(item => (
                        <div className={'app-from-left-controller-group-item'}>
                            <small>{item.name}</small>
                        </div>
                    ))}
                </ReactSortable>
            </div>
        )
    }
}
