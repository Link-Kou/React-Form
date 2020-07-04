import * as React from 'react';

import './index.scss'

/**
 *
 * @author lk
 * @date 2020/6/30 09:59
 * @version 1.0
 */
export default class BasePanle extends React.Component {
    public render() {
        const {children} = this.props
        return (
            <>
                <div className={'app-buildForm-basePanle'}>
                    {children}
                </div>
            </>
        )
    }
}
