import * as React from 'react';
import {Button} from 'rsuite';
import LeftPanle from './component/leftPanle';
import BasePanle from './component/basePanle';
import CenterPanle from './component/centerPanle';
import RightPanle from './component/rightPanle';
import {IFormNode} from './types';

interface IState {
    formValue: Array<IFormNode>
}

/**
 *
 * @author lk
 * @date 2020/6/29 18:58
 * @version 1.0
 */
export default class index extends React.Component {

    public state: IState = {
        formValue: []
    }

    private _onRefresh = () => {
        const {formValue} = this.state
        this.setState({
            formValue: formValue.concat()
        })
    }

    private _onChange = (newState: Array<any>) => {
        this.setState({
            formValue: newState.concat()
        })
    }

    public render() {
        const {formValue} = this.state
        return (
            <>
                <Button onClick={() => {
                    console.log(this.state.formValue)
                }}>输出</Button>
                <Button onClick={() => {
                    this.setState({
                        formValue: []
                    })
                }}>清空</Button>
                <BasePanle>
                    <LeftPanle/>
                    <CenterPanle formValue={formValue} onChange={this._onChange} onRefresh={this._onRefresh}/>
                    <RightPanle/>
                </BasePanle>
            </>
        )
    }
}
