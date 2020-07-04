import * as React from 'react';
import {Col, ControlLabel, Divider, Form, FormControl, FormGroup, Grid, InputNumber, Row, Tree} from 'rsuite';


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
export default class RightPanleCol extends React.Component<IProps> {

    public state = {
        treeData: [],
        formValue: {
            lg: '',
            md: '',
            sm: '',
            xs: ''
        },
        treeController: undefined
    }

    public componentDidMount() {
        const {item} = this.props
        const {lg, md, sm, xs} = item?.properties ?? {}
        this.setState({
            treeData: [Object.assign({}, item)].concat(),
            formValue: {
                lg,
                md,
                sm,
                xs
            }
        })
    }

    private _onChange = (formValue: any) => {
        const {item, updateData} = this.props
        const {lg, md, sm, xs} = formValue
        item.properties = {
            lg,
            md,
            sm,
            xs
        }
        this.setState({
            formValue
        }, () => {
            updateData?.()
        })
    }

    public render() {
        const {formValue, treeData} = this.state
        return (
            <Grid fluid={true}>
                <Form fluid={true}
                      formValue={formValue}
                      onChange={this._onChange}>
                    <Divider>响应信息</Divider>
                    <Row style={{textAlign: 'center'}}>
                        <Col lg={6} md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>栅格-LG</ControlLabel>
                                <FormControl name="lg" max={24} min={2} accepter={InputNumber}/>
                                <ControlLabel>≥1200px</ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>栅格-MD</ControlLabel>
                                <FormControl name="md" max={24} min={2} accepter={InputNumber}/>
                                <ControlLabel>≥992px</ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>栅格-SM</ControlLabel>
                                <FormControl name="sm" max={24} min={2} accepter={InputNumber}/>
                                <ControlLabel>≥480px</ControlLabel>
                            </FormGroup>
                        </Col>
                        <Col lg={6} md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>栅格-XS</ControlLabel>
                                <FormControl name="xs" max={24} min={2} accepter={InputNumber}/>
                                <ControlLabel>&lt;480px</ControlLabel>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Divider>布局信息</Divider>
                    <Row>
                        <Col md={24}>
                            <Tree defaultExpandAll={true}
                                  data={treeData}
                                  labelKey={'name'}
                                  valueKey={'id'}/>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        );
    }
}
