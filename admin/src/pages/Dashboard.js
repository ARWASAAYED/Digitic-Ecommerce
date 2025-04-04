import React from 'react'
import { BsArrowUpRight , BsArrowUpLeft} from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Flex, Table } from 'antd';
const Dashboard = () => {
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
          dataIndex: 'key',
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
        product: 32,
        status: `London, Park Lane no. ${i}`,
      }));
  return (
    <div>
    <h3 className="mb-4 title">Dashboard</h3>
    <div className="d-flex justify-content-between align-items-center gap-3">

      <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
        <div>
          <p className=" desc">Total</p>
          <h4 className="mb-0 .sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6> <BsArrowUpRight /> 325 </h6>
          <p className="mb-0 desc">Compared to April 2025</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
        <div>
          <p className=" desc">Total</p>
          <h4 className="mb-0 .sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6 className="red">
          <BsArrowUpRight /> 25
          </h6>
          <p className="mb-0 desc">Compared to April 2025</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
        <div>
          <p className="desc">Total</p>
          <h4 className="mb-0 .sub-title">$1100</h4>
        </div>
        <div className="d-flex flex-column align-items-end">
          <h6 className="green">
          <BsArrowUpRight /> 32%
          </h6>
          <p className="mb-0 desc">Compared to April 2025</p>
        </div>
      </div>

    </div>
    <div>
    <div className='mt-4'>
        <h3 className='mb-5 title'>Income Statics</h3>
        <div>
<BarChart width={1160} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#82ca9d" />
      </BarChart>
        </div>
    </div>
    <div className="mt-4">
    <h3 className='mt-5 title'>Recent Orders</h3>
    <div>
    <Table  columns={columns} dataSource={dataSource} />
    </div>
    </div>
  </div>

  </div>
  )
}

export default Dashboard