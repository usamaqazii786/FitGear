"use client"

import React, { useEffect, useCallback, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useRouter();

    const getProducts = useCallback(async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`,{
                headers:{
                    authorization:   `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    // localStorage.getItem('users')),
                    
                }
            });
            result = await result.json();
            setName(result?.name);
            setPrice(result?.price);
            setCategory(result?.category);
            setCompany(result?.company);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }, [params.id]); // Dependency on params.id

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const updateProduct = async () => {
        console.log(name, price, category, company);
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"PUT",
            body: JSON.stringify({name, price, category, company}),
            headers:{
              'Content-Type':'application/json',
              authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
          });
          result = await result.json();
          console.log(result);
          navigate("/")
          navigate.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container vh-usa'>
            <div className="row">
                <div className="col-md-12">
                    <div className='w-100 d-grid mt-3'>
                        <h1 className='text-black'>Update Product</h1>
                        <input
                            type="text"
                            placeholder='Please product name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-25 feld-center-usa border-2 border-black'
                        />
                        <input
                            type="text"
                            placeholder='Please product price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='w-25 feld-center-usa border-2 border-black'
                        />
                        <input
                            type="text"
                            placeholder='Please product category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-25 feld-center-usa border-2 border-black'
                        />
                        <input
                            type="text"
                            placeholder='Please product company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className='w-25 feld-center-usa border-2 border-black'
                        />
                        <button
                            type='button'
                            onClick={updateProduct}
                            className='bg-primary w-25 feld-center-usa text-light'
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
