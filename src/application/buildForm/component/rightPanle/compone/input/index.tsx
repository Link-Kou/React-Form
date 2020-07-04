import * as React from 'react';
import {ControlLabel, Divider, Form, FormControl, FormGroup, Grid, Radio, RadioGroup} from 'rsuite';


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
            size: ''
        },
        treeController: undefined
    }

    public componentDidMount() {
        const {item} = this.props
        const {size} = item?.properties ?? {}
        this.setState({
            treeData: [Object.assign({}, item)].concat(),
            formValue: {
                id: item.id,
                type: item.type,
                size: size ?? 'md'
            }
        })
    }

    private _onChange = (formValue: any) => {
        const {item, updateData} = this.props
        const {size} = formValue
        item.properties = {
            size
        }
        this.setState({
            formValue: {
                size
            }
        }, () => {
            updateData?.()
        })
    }


    public render() {
        const {formValue} = this.state
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
                    <FormGroup className={'app-FormGroup-h'}>
                        <ControlLabel>大小</ControlLabel>
                        <FormControl name="size" inline={true} appearance="picker"
                                     accepter={RadioGroup}>
                            <Radio value="lg">lg</Radio>
                            <Radio value="md">md</Radio>
                            <Radio value="sm">sm</Radio>
                            <Radio value="xs">xs</Radio>
                        </FormControl>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}
