import React, { Component } from 'react'
import Grid from '@hi-ui/hiui/es/grid'
import { Link } from 'react-router-dom'
import { DataFilter } from '@hi-ui/component-kit/es/data-filter'
import Radio from '@hi-ui/hiui/es/radio'
import Button from '@hi-ui/hiui/es/button'
import Icon from '@hi-ui/hiui/es/icon'

export default class Template extends Component {
  constructor (props) {
    super(props)

    this.columnMixins = {
      column1: {
        sorter (pre, next) {
          return pre.column1 - next.column1
        }
      },
      action: {
        render: () => (
          <React.Fragment>
            <Icon name='edit' />
            <Icon name='close' />
            <Icon name='more' />
          </React.Fragment>
        )
      }
    }

    this.state = {
      field1: {
        list: [ '全部', '订单A', '订单B', '订单C', '订单D', '订单E', '订单F' ],
        checkIndex: 0
      },
      field2: {
        list: [ '全部', '小米商城', '小米之家', '天猫旗舰店', '京东旗舰店' ],
        checkIndex: 0
      },
      field3: {
        list: [ '全部', '顺丰', 'EMS', '中通', '申通', '圆通', '自取' ],
        checkIndex: 0
      },
      pageSize: 10,
      forms: this.initForms()
    }
  }

  updateForm (data) {
    const forms = Object.assign({}, this.state.forms, data)

    this.setState({
      forms
    }, () => {
      this.dataFilter.submit(forms)
    })
  }

  initForms () {
    return Object.assign({}, {
      column1: '全部',
      column2: '全部',
      column3: '全部'
    })
  }

  render () {
    const Row = Grid.Row
    const Col = Grid.Col

    const {
      field1,
      field2,
      field3,
      pageSize,
      forms
    } = this.state
    const params = {
      pageSize
    }

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={24}>

            <DataFilter
              ref={node => (this.dataFilter = node)}
              url={`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`}
              params={params}
              columnMixins={this.columnMixins}
              actions={[
                'search',
                <Link to='/form-unfold-group' className='hi-tpl__add'>
                  <Button type='primary' icon='plus' />
                </Link>,
                <Button type='line' icon='download' onClick={() => {
                  console.log('------------click download')
                }} />,
                <Button type='line' icon='mark' onClick={() => {
                  console.log('------------click share')
                }} />,
                <Button type='line' icon='more' onClick={() => {
                  console.log('------------click more')
                }} />
              ]}
              activeTools={['query']}
              tools={[
                {
                  type: 'query',
                  title: '查询',
                  forms,
                  submit: false
                }
              ]}
            >
              <Row gutter>
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>订单类型</div>
                </Col>
                <Col span={22}>
                  <Radio
                    list={field1.list}
                    checked={field1.checkIndex}
                    onChange={data => {
                      field1.checkIndex = field1.list.indexOf(data)
                      this.setState({
                        field1
                      }, () => {
                        this.updateForm({ 'column1': data })
                      })
                    }}
                  />
                </Col>
              </Row>
              <Row gutter>
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>业务来源</div>
                </Col>
                <Col span={22}>
                  <Radio
                    list={field2.list}
                    checked={field2.checkIndex}
                    onChange={data => {
                      field2.checkIndex = field2.list.indexOf(data)
                      this.setState({
                        field2
                      }, () => {
                        this.updateForm({ 'column2': data })
                      })
                    }}
                  />
                </Col>
              </Row>
              <Row gutter>
                <Col span={2}>
                  <div style={{ textAlign: 'right' }}>运输方式</div>
                </Col>
                <Col span={22}>
                  <Radio
                    list={field3.list}
                    checked={field3.checkIndex}
                    onChange={data => {
                      field3.checkIndex = field3.list.indexOf(data)
                      this.setState({
                        field3
                      }, () => {
                        this.updateForm({ 'column3': data })
                      })
                    }}
                  />
                </Col>
              </Row>
            </DataFilter>

          </Col>
        </Row>
      </div>
    )
  }
}
