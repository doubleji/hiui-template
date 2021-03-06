import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from '@hi-ui/hiui/es/table'
import Input from '@hi-ui/hiui/es/input'
import Button from '@hi-ui/hiui/es/button'
import Grid from '@hi-ui/hiui/es/grid'
import Icon from '@hi-ui/hiui/es/icon'
import axios from 'axios'

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
      pageSize: 0,
      total: 0,
      page: 1,
      tableDatas: [],
      columns: []
    }
  }

  componentWillMount () {
    this.fetchDatas()
  }

  fetchDatas () {
    const {
      page,
      s
    } = this.state

    axios.get(`https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui/table/get-datas`, {
      params: {
        page,
        s
      }
    }).then(ret => {
      const datas = []

      if (ret && ret.data.code === 200) {
        const data = ret.data.data
        const columns = data.columns
        const pageInfo = data.pageInfo

        data.data.map(data => {
          datas.push(data)
        })
        this.setState({
          tableDatas: datas,
          page: pageInfo.page,
          total: pageInfo.total,
          pageSize: pageInfo.pageSize,
          columns: this.setTableColumns(columns)
        })
      }
    })
  }

  setTableColumns (columns) {
    const _columns = []

    columns.map(column => {
      const key = column.key

      _columns.push({
        ...column,
        ...this.columnMixins[key]
      })
    })

    return _columns
  }

  search () {
    const {
      s
    } = this.state

    if (!s) {
      return
    }

    this.setState({
      page: 1
    }, () => {
      this.fetchDatas()
    })
  }

  render () {
    const {
      columns,
      tableDatas,
      pageSize,
      total,
      page,
      value
    } = this.state
    const Row = Grid.Row
    const Col = Grid.Col

    return (
      <div className='page page--gutter'>
        <Row>
          <Col span={18}>
            <Input
              value={value}
              placeholder='搜索关键词'
              style={{ width: '200px' }}
              append={
                <Button type='line' icon='search' onClick={() => this.search()} />
              }
              onChange={e => {
                this.setState({ s: e.target.value })
              }}
            />
          </Col>
          <Col span={6} style={{ 'textAlign': 'right' }}>
            <Link to='/form-unfold-group' style={{ 'marginRight': '8px' }}>
              <Button type='primary' icon='plus' />
            </Link>
            <Button type='line' icon='download' />
            <Button type='line' icon='mark' />
            <Button type='line' icon='more' />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              data={tableDatas}
              pagination={{
                pageSize: pageSize,
                total: total,
                page: page,
                onChange: (page, pre, size) => {
                  this.setState({ page: page }, () => this.fetchDatas())
                }
              }}
            />
          </Col>
        </Row>

      </div>
    )
  }
}
