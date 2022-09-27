import React from 'react';
import { Navbar, Library } from './index'
import { useParams } from 'react-router-dom';

export function Category (props) {
    const { category } = useParams()
    return(
        <div>
        <Navbar />
        <Library type={category}/>
        </div>
    )
}