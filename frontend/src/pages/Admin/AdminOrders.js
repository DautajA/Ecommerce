import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useAuth } from '../../context/auth';
import { Select } from 'antd';

const AdminOrders = () => {
    const [status] = useState(['Not Process', 'Processing', 'Shipping', 'Delivered', 'Cancel']);
    const [changeStatus, setChangeStatus] = useState('');
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/auth/all-orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    
    const handleChange = async(orderId, value) => {
      try {
        const {data} = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {status:value});
        toast.success("Order status updated successfully");
        getOrders();
      } catch (error) {
        console.log(error)
        toast.error("Failed to update order status");
      }
    };
    return (
        <Layout title="All Orders Data">
            <div className="container-fluid mt-3 pt-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="admin-part text-center">All Orders</h1>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow" key={o._id}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {status.map((s, index) => (
                                                            <Select.Option key={index} value={s}>
                                                                {s}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container-fluid">
                                        {o?.products?.map((p) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        width="100px"
                                                        height="200px"
                                                        style={{ objectFit: "cover" }}
                                                        alt={p.name}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price: $ {p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;

