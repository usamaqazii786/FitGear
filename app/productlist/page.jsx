"use client"

import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from 'next/navigation';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch("/app/next-js-backend/pages/api/products",{
                headers:{
                    authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            result = await result.json();

            console.log(result); 

            if (Array.isArray(result)) {
                setProducts(result);
            } else {
                console.error("Expected an array but got:", result);
                setProducts([]); 
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProducts([]); 
        }
    }

    const ProductDeleted = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers:{
                    authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
            result = await result.json();
            if (result) {
                getProducts();
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }

    const handleEdit = async (item) =>{
        router.push(`/update/${item?._id}`);
    }

    const handleSearch = async (e) =>{
        const key = e.target.value;
    if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            });
        result = await result.json();
        if (result) {
          setProducts(result);
        }
    }else{
        getProducts()
    }
      }

    return (
        <>
            <div className='container'>
                <h1>Product List</h1>
                <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={handleSearch}
              className="me-2"
              aria-label="Search"
            />
          </Form>
           <div className="overflow-x-scroll">
           <table className='table mb-0 align-middle bg-white'>
                    <thead className='bg-light'>
                        <tr>
                            <th>S. No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((item, index) => (
                                <tr key={item?._id}>
                                    <td>
                                        <p className='mb-1 fw-normal'>{index + 1}</p>
                                    </td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt='profile'
                                                style={{ width: 45, height: 45 }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='mb-1 fw-bold'>{item?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='mb-1 fw-normal'>$ {item?.price}</p>
                                    </td>
                                    <td>
                                        <p className='mb-1 fw-normal'>
                                            {item?.company}
                                        </p>
                                    </td>
                                    <td>
                                        <p className='mb-1 fw-normal'>
                                            {item?.category}
                                        </p>
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => ProductDeleted(item?._id)} className='btn btn-danger btn-sm btn-rounded'>
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={()=> handleEdit(item)} type='button' className='btn btn-info btn-sm btn-rounded'>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No products available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
           </div>
            </div>
        </>
    );
}

export default ProductList;
