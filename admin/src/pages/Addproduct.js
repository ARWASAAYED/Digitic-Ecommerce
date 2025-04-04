import React from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "../components/Editor";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const Addproduct = () => {
     const [value, setValue] = React.useState("");
  return (
    <div>
    <h3 className="mb-4 title">Add Product</h3>
    <div>
        <form action="">
        <CustomInput type="text" label="Enter Product Title" />
        <div className='mb-3'>
            <Editor readOnly={false} value={value} onChange={setValue} />
        </div>
        <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Brand</option>
        </select>

        <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Category</option>
        </select>

        <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Color</option>
        </select>

        <CustomInput type="text" label="Enter Product Price" />
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>


        <button className="btn btn-success border-0 rounded-3 my-5 mt-3" type="submit">Add Product</button>
        </form>
    </div>
</div>
  )
}

export default Addproduct
