import * as React from 'react';
import {Col, Divider, Form, Grid, Row, Tree} from 'rsuite';


interface IProps {
    item: any

    list: Array<any>

    updateData(): void
}

/**
 *
 * @author lk
 * @date 2020/7/1 21:00
 * @version 1.0
 */
export default class RightPanleGrid extends React.Component<IProps> {

    public state = {
        treeData: [],
        formValue: {},
        treeController: undefined
    }

    public componentDidMount() {
        const {item} = this.props
        this.setState({
            treeData: [item]
        })
    }


    public render() {
        const {formValue, treeData, treeController} = this.state
        return (
            <Grid fluid={true}>
                <Form fluid={true}
                      formValue={formValue}>
                    <Divider>布局信息</Divider>
                    <Row>
                        <Col md={12}>
                            <Tree defaultExpandAll={true}
                                  data={treeData}
                                  labelKey={'name'}
                                  valueKey={'id'}/>
                        </Col>
                        <Col md={12}>
                            {treeController}
                        </Col>
                    </Row>
                </Form>
            </Grid>
        );
    }
}
