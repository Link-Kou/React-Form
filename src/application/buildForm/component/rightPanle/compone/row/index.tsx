import * as React from 'react';
import {
    ButtonToolbar,
    Col,
    ControlLabel,
    Divider,
    Form,
    FormControl,
    FormGroup,
    Grid, Icon, IconButton,
    InputNumber,
    Row,
    Tree
} from 'rsuite';
import nanoid from 'nanoid';


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
export default class RightPanleRow extends React.Component<IProps> {

    public state = {
        treeData: [],
        formValue: {
            id: '',
            type: '',
            gutter: ''
        },
        treeController: undefined
    }

    public componentDidMount() {
        const {item} = this.props
        const {gutter} = item?.properties ?? {}
        this.setState({
            treeData: [Object.assign({}, item)].concat(),
            formValue: {
                id: item.id,
                type: item.type,
                gutter
            }
        })
    }

    private _onChange = (formValue: any) => {
        const {item, updateData} = this.props
        const {gutter} = formValue
        item.properties = {
            gutter
        }
        updateData?.()
    }

    private _onColAdd = () => {
        const {item, updateData} = this.props
        item?.children?.push(
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
        )
        this.setState({
            treeData: [Object.assign({}, item)].concat()
        }, () => {
            updateData?.()
        })
    }

    private _onColAverage = () => {
        const {item, updateData} = this.props
        const children: Array<any> = item?.children
        const average = Math.floor(24 / children.length);
        const number = 24 - children.length * average
        children?.forEach((k: any, i: any, a: any) => {
            if (i === a.length - 1) {
                if (number > 0) {
                    const surplus = average + number;
                    k.properties = {
                        xs: surplus,
                        sm: surplus,
                        md: surplus
                    }
                    return k
                }
            }
            k.properties = {
                xs: average,
                sm: average,
                md: average
            }
            return k
        });
        updateData?.()
    }

    private renderNode = (nodeData: any): any => {
        const properties = Object.keys(nodeData?.properties ?? {}).map((k, i, a) => {
            return (
                <label><span>{k}:</span><span>{nodeData.properties[k]}</span></label>
            )
        });
        return (
            <div>
                {nodeData.name}
                <br/>
                <div style={{
                    display: 'flex',
                    width: 125,
                    justifyContent: 'space-between'
                }}>
                    {properties}
                </div>
            </div>
        )
    }

    public render() {
        const {formValue, treeData} = this.state
        return (
            <Grid fluid={true}>
                <Form fluid={true}
                      formValue={formValue}
                      onChange={this._onChange}>
                    <Divider>基础信息</Divider>
                    <FormGroup>
                        <ControlLabel>编号</ControlLabel>
                        <FormControl readOnly={true} name="id"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>类型</ControlLabel>
                        <FormControl readOnly={true} name="type"/>
                    </FormGroup>
                    <Divider>响应信息</Divider>
                    <FormGroup>
                        <ControlLabel>栅格的间距</ControlLabel>
                        <FormControl name="gutter" accepter={InputNumber}/>
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <IconButton onClick={this._onColAdd}
                                        appearance={'link'}
                                        icon={<Icon icon="plus-circle"/>}>添加列</IconButton>
                            <IconButton onClick={this._onColAverage}
                                        appearance={'link'}
                                        icon={<Icon icon="arrows-h"/>}>平均列</IconButton>
                        </ButtonToolbar>
                    </FormGroup>
                    <Divider>布局信息</Divider>
                    <Row>
                        <Col md={24}>
                            <Tree defaultExpandAll={true}
                                  data={treeData}
                                  renderTreeNode={this.renderNode}
                                  labelKey={'name'}
                                  valueKey={'id'}/>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        );
    }
}
