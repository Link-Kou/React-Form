import * as React from 'react';
import {ReactSortable} from 'react-sortablejs';
import {ControlLabel, FormControl, FormGroup} from 'rsuite';
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
export default class InputGroup extends React.Component {

    public CustomComponent = React.forwardRef<HTMLDivElement, any>((props, ref) => {
        return <div ref={ref} className={'app-from-left-controller-group-panle'}>{props.children}</div>;
    });

    private getNewData = (): any => {
        const state: IState = {
            list: [
                {
                    id: nanoid(),
                    type: 'Input',
                    controls: (list, item, onRefresh) => <FormGroup>
                        <ControlLabel>单行文本框</ControlLabel>
                        <FormControl name="name" {...item?.properties} />
                    </FormGroup>,
                    name: '文本框'
                },
                {
                    id: nanoid(),
                    type: 'Input',
                    controls: (list, item, onRefresh) => <FormGroup>
                        <ControlLabel>多行文本框</ControlLabel>
                        <FormControl componentClass="textarea" name="name" {...item?.properties} />
                    </FormGroup>,
                    name: '多行文本框'
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
                <p>输入型控件</p>
                <ReactSortable
                    tag={this.CustomComponent}
                    list={list}
                    group={{
                        name: Itype.Shared,
                        pull: 'clone',
                        put: false
                    }}
                    sort={false}
                    animation={200}
                    delay={2}
                    fallbackOnBody={true}
                    invertSwap={true}
                    setList={newState => {
                        this.setState({list: this.getNewData()})
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
