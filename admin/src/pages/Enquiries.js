import React from 'react'
import { Flex, Table } from 'antd';
const data = [
  { month: "Jan", sales: 36 },
  { month: "Feb", sales: 52 },
  { month: "Mar", sales: 61 },
  { month: "Apr", sales: 145 },
  { month: "May", sales: 46 },
  { month: "Jun", sales: 27 },
  { month: "Jul", sales: 38 },
  { month: "Aug", sales: 38 },
  { month: "Sept", sales: 38 },
  { month: "Oct", sales: 350},
  { month: "Nov", sales: 370},
  { month: "Dec", sales: 400},
];
const columns = [
  {
    title: 'No',
    dataIndex: 'Key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
      title: 'Status',
      dataIndex: 'status',
    },
];
const dataSource = Array.from({
  length: 46,
}).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  status: `London, Park Lane no. ${i}`,
}));
const Enquiries = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
        <Table  columns={columns} dataSource={dataSource} />
      </div>
    </div>
  )
}

export default Enquiries