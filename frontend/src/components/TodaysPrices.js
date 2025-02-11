import React, { useEffect, useState } from 'react';
import './Todaysprices.css'; // Importing the CSS file

const Prices = () => {
    const [commodityPrices, setCommodityPrices] = useState([]);
    const [filterText, setFilterText] = useState('');

    const cropsData = [
        { commodity: 'Wheat', state: 'Maharashtra', district: 'Yavatmal', market_name: 'Pusad' },
        { commodity: 'Tomato', state: 'Andhra Pradesh', district: 'Chittor', market_name: 'Madanapalli' },
        { commodity: 'Sunflower', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Sugarcane', state: 'Maharashtra', district: 'Amarawati', market_name: 'Amrawati(Frui & Veg. Market)' },
        { commodity: 'Soyabean', state: 'Maharashtra', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Sesamum(Sesame,Gingelly,Til)', state: 'Maharashtra', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Safflower', state: 'Maharashtra', district: 'Ahmednagar', market_name: 'Ahmednagar' },
        { commodity: 'Ragi (Finger Millet)', state: 'Tamil Nadu', district: 'Ariyalur', market_name: 'Andimadom' },
        { commodity: 'Potato', state: 'Telangana', district: 'Adilabad', market_name: 'Adilabad(Rythu Bazar)' },
        { commodity: 'Pegeon Pea(Arhar Fali)', state: 'Gujarat', district: 'Anand', market_name: 'Khambhat(Veg Yard Khambhat)' },
        { commodity: 'Paddy(Dhan)(Common)', state: 'Telangana', district: 'Adilabad', market_name: 'Asifabad' },
        { commodity: 'Onion', state: 'Telangana', district: 'Adilabad', market_name: 'Jainath' },
        { commodity: 'Niger Seed (Ramtil)', state: 'Madhya Pradesh', district: 'Anupur', market_name: 'Anuppur' },
        { commodity: 'Mustard', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Maize', state: 'Telangana', district: 'Adilabad', market_name: 'Asifabad' },
        { commodity: 'Lentil(Masur) (Whole)', state: 'Madhya Pradesh', district: 'Agar Malwa', market_name: 'Nalkheda(F&V)' },
        { commodity: 'Jowar(Sorghum)', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Groundnut', state: 'Uttar Pradesh', district: 'Agra', market_name: 'Samsabad' },
        { commodity: 'Green Gram (Moong)(Whole)', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Gram Raw(Chholia)', state: 'Punjab', district: 'Amritsar', market_name: 'Amritsar(Amritsar Mewa Mandi)' },
        { commodity: 'Copra', state: 'Tamil Nadu', district: 'Ariyalur', market_name: 'Andimadom' },
        { commodity: 'Chili Red', state: 'Maharashtra', district: 'Ahmednagar', market_name: 'Ahmednagar' },
        { commodity: 'Black Gram (Urd Beans)(Whole)', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Barley (Jau)', state: 'Uttar Pradesh', district: 'Agra', market_name: 'Achnera' },
        { commodity: 'Bajra(Pearl Millet/Cumbu)', state: 'Uttar Pradesh', district: 'Agra', market_name: 'Achnera' }
    ];

    // Function to call the API for each crop one by one
    const getCommodityPrices = async () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        try {
            const prices = [];
            for (let i = 0; i < cropsData.length; i++) {
                const crop = cropsData[i];
                const response = await fetch('http://localhost:5000/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        commodity: crop.commodity,
                        state: crop.state,
                        district: crop.district,
                        market_name: crop.market_name,
                        start_date: today,
                        end_date: today
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    data.forEach(row => {
                        prices.push({
                            commodity: crop.commodity,
                            minPrice: row['Min Price'].toFixed(2),
                            maxPrice: row['Max Price'].toFixed(2),
                            modalPrice: row['Modal Price'].toFixed(2)
                        });
                    });
                } else {
                    console.error('Failed to retrieve price data for crop:', crop.commodity);
                }
            }
            setCommodityPrices(prices);
        } catch (error) {
            console.error('Error fetching commodity prices:', error);
        }
    };

    useEffect(() => {
        getCommodityPrices();
    }, []);

    const filterTable = () => {
        const filter = filterText.toUpperCase();
        return commodityPrices.filter(row =>
            row.commodity.toUpperCase().includes(filter)
        );
    };

    return (
        <div className="prices-container">
            <h1>TODAYS DATE: <span id="currentDate">{new Date().toISOString().split('T')[0]}</span></h1>

            <input
                type="text"
                id="filterInput"
                placeholder="Search Commodity"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="filter-input"
            />
            <h1>Price per Quintal(100kG)</h1>
            <table className="price-table">
                <thead>
                    <tr>
                        <th>Commodity</th>
                        <th>Min Price</th>
                        <th>Max Price</th>
                        <th>Modal Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filterTable().map((row, index) => (
                        <tr key={index}>
                            <td>{row.commodity}</td>
                            <td>{row.minPrice}</td>
                            <td>{row.maxPrice}</td>
                            <td>{row.modalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prices;
