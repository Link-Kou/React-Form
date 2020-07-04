import * as React from 'react';
import './index.scss'
import InputGroup from './compone/inputGroup';
import LayoutGroup from './compone/layoutGroup';

/**
 *
 * @author lk
 * @date 2020/6/29 18:58
 * @version 1.0
 */
export default class LeftPanle extends React.Component {
    public render() {
        return (
            <div className={'app-from-left-controller'}>
                <InputGroup/>
                <LayoutGroup/>
            </div>
        )
    }
}
