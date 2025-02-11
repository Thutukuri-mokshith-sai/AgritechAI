import React from 'react';
import BufferStock from './Bufferstock';
import Footer from './footer/footer';
import Header from './Header';
import BufferStockDetails from './Admin/bufferStockDetails';
const BufferDashboard = () => {
    return (
        <div>
            <Header />
            <h2>Buffer Stock Dashboard</h2>
            <p>Welcome to the Buffer Stock Dashboard!</p>
            <BufferStockDetails />
            <BufferStock />
            <Footer/>
        </div>
    );
};

export default BufferDashboard;
