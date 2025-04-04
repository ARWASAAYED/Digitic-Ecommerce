import React, { useState } from 'react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import { AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { FaBlogger, FaBloggerB } from 'react-icons/fa6';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate=useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
        <h2 className='text-white fs-5 text-center py-3 mb-0'>
        <span className='sm-logo'>DC</span>
        <span className='lg-logo'>Dev Corner</span>
        </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key=='signout'){
            }else{
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children:[
                {
                  key: 'Product',
                  icon: <AiOutlineShoppingCart className='fs-5' />,
                  label: 'Add product',
                },
                {
                  key: 'Product-list',
                  icon: <AiOutlineShoppingCart className='fs-5' />,
                  label: 'Product-list',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-5' />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder className='fs-5' />,
                  label: 'Brand list',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-5' />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className='fs-5' />,
                  label: 'Category list',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-5' />,
                  label: 'Color',
                },
                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors className='fs-5' />,
                  label: 'Color list',
                },

              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children:[
                {
                  key: 'blog',
                  icon: <FaBloggerB className='fs-5' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <ImBlog className='fs-5' />,
                  label: 'Blog list',
                },
                {
                  key: 'blog-category',
                  icon: <FaBloggerB className='fs-5' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <ImBlog className='fs-5' />,
                  label: 'Blog Category list',
                }
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          
          <Button
            type="text"
            icon={collapsed ? <AiOutlineAlignRight /> : <AiOutlineAlignLeft/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            
          />
          <div className='d-flex gap-3 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4'/>
              <span className='badge  rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img  className="rounded-circle" width={45} height={45}src="https://i.pinimg.com/736x/97/22/2f/97222fa158251b2feb29efb5c5103f57.jpg" alt=""/>
              </div>
              <div 
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          
              >
                <h5 className='mb-0'>Arwa</h5>
                <p className='mb-0'>arwaahmed2553@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
     
        <li>
          <Link
            className="dropdown-item py-1 mb-1"
            style={{ height: "auto", lineHeight: "20px" }}
            to="/admin"
          >
            View Profile
          </Link>
        </li>

        <li>
          <Link
            className="dropdown-item py-1 mb-1"
            style={{ height: "auto", lineHeight: "20px" }}
            to="/admin"
          >
           Signout
          </Link>
        </li>

    </div>
            </div>
          </div>
          
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;