import * as React from 'react';
import {Icon, Nav} from 'rsuite';
import './index.scss'
import RightPanleGrid from './compone/grid';
import RightPanleRow from './compone/row';
import RightPanleCol from './compone/col';
import RightPanleInput from './compone/input';
import Listener from '../../listenner';

/**
 *
 * @author lk
 * @date 2020/6/29 18:58
 * @version 1.0
 */
export default class RightPanle extends React.Component {

    private _onControllerClick: any

    private Panle = {
        'Grid': (item: any, list: any, updateData: () => void) => <RightPanleGrid list={list}
                                                                                  updateData={updateData}
                                                                                  item={item}/>,
        'Row': (item: any, list: any, updateData: () => void) => <RightPanleRow list={list}
                                                                                updateData={updateData}
                                                                                item={item}/>,
        'Col': (item: any, list: any, updateData: () => void) => <RightPanleCol list={list}
                                                                                updateData={updateData}
                                                                                item={item}/>,
        'Input': (item: any, list: any, updateData: () => void) => <RightPanleInput list={list}
                                                                                    updateData={updateData}
                                                                                    item={item}/>
    }

    public state = {
        controllerPanle: '',
        selectId: ''
    }

    public componentDidMount(): void {
        this._onControllerClick = PubSub.subscribe(Listener.onControllerClick, this._ControllerClick.bind(this));
    }

    public componentWillMount(): void {
        PubSub.unsubscribe(this._onControllerClick);
    }

    public _ControllerClick(name: string, props: any) {
        const {list, item, callbackUpdate} = props
        if (item?.type) {
            this.setState({
                selectId: item.id,
                controllerPanle: this.Panle[item?.type]?.(item, list, callbackUpdate)
            })
        }
    }

    /***
     * 高亮显示选择的
     * @private
     */
    private _SelectCss = () => {
        const {selectId} = this.state
        console.log('Select', selectId)
        document.querySelectorAll('[form-id]')
            .forEach((k, i, a) => {
                if (k.getAttribute('form-id') === selectId) {
                    k.classList.add('app-from-controller-select-item')
                } else {
                    k.classList.remove('app-from-controller-select-item')
                }
            })
    }

    public render() {
        const {controllerPanle} = this.state
        this._SelectCss()
        return (
            <div className={'app-from-right-controller'}>
                <Nav appearance="subtle" activeKey={'attributes'} style={{marginBottom: 10}}>
                    <Nav.Item eventKey={'attributes'} icon={<Icon icon="home"/>}>属性</Nav.Item>
                </Nav>
                {controllerPanle}
            </div>

        )
    }
}
