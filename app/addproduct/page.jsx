"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState();
    const router = useRouter();

    const handleAdd = async () => {
     try {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('users'));
        console.log(userId)
        let result = await fetch("http://localhost:5000/add-product", {
            method: "Post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'content-Type': 'application/json',
                authorization:  `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        router.push("/");
        console.log(result)
     } catch (error) {
        console.error(error)
     }
    }

    return (
        <>
            <div className='container vh-usa'>
                <div className="row">
                    <div className="col-md-12">
                        <div className='mt-3 w-100 d-grid'>
                            <h1 className='text-black'>Add Product</h1>
                            <input type="text" placeholder='Please product name' value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-black w-25 feld-center-usa' />

                            {error && !name &&(
                                <span className='text-danger w-25 feld-center-usa'>please valid name</span>
                            )}

                            <input type="text" placeholder='Please product price' value={price} onChange={(e) => setPrice(e.target.value)} className='border-2 border-black w-25 feld-center-usa' />

                            {error && !price &&(
                                <span className='text-danger w-25 feld-center-usa'>please valid price</span>
                            )}

                            <input type="text" placeholder='Please product category' value={category} onChange={(e) => setCategory(e.target.value)} className='border-2 border-black w-25 feld-center-usa' />

                            {error && !category &&(
                                <span className='text-danger w-25 feld-center-usa'>please valid category</span>
                            )}

                            <input type="text" placeholder='Please product company' value={company} onChange={(e) => setCompany(e.target.value)} className='border-2 border-black w-25 feld-center-usa' />

                            {error && !company &&(
                                <span className='text-danger w-25 feld-center-usa'>please valid company</span>
                            )}

                            <button type='button' onClick={handleAdd} className='bg-primary w-25 feld-center-usa text-light'>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct;
