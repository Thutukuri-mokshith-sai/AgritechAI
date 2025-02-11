import React, { useEffect, useState } from 'react';
import './Bufferstock.css'
const BufferStock = () => {
    const [cropsData] = useState([
        { commodity: 'Wheat', state: 'Maharashtra', district: 'Yavatmal', market_name: 'Pusad' },
        { commodity: 'Tomato', state: 'Andhra Pradesh', district: 'Chittor', market_name: 'Madanapalli' },
        { commodity: 'Sunflower', state: 'Telangana', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Sugarcane', state: 'Maharashtra', district: 'Amarawati', market_name: 'Amrawati(Frui & Veg. Market)' },
        { commodity: 'Soyabean', state: 'Maharashtra', district: 'Adilabad', market_name: 'Bhainsa' },
        { commodity: 'Sesamum (Sesame, Gingelly, Til)', state: 'Maharashtra', district: 'Adilabad', market_name: 'Bhainsa' },
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
    ]);
    
    const modalPrices = {
        "Bajra(Pearl Millet/Cumbu)": 2307.8679454174307,
        "Barley (Jau)": 2063.6634083286754,
        "Black Gram (Urd Beans)(Whole)": 7702.365299499749,
        "Chili Red": 16522.710944793176,
        "Copra": 8574.951336302895,
        "Gram Raw(Chholia)": 4097.871126760563,
        "Green Gram (Moong)(Whole)": 7738.501743679163,
        "Groundnut": 6149.014485831848,
        "Jowar(Sorghum)": 3184.501692304574,
        "Lentil (Masur)(Whole)": 6209.335554026615,
        "Maize": 2149.2996829091694,
        "Mustard": 5295.711422435417,
        "Niger Seed (Ramtil)": 7705.034985422741,
        "Onion": 2936.883951669156,
        "Paddy(Dhan)(Common)": 2206.249357477732,
        "Pegeon Pea (Arhar Fali)": 6333.53302373581,
        "Potato": 1904.839650135436,
        "Ragi (Finger Millet)": 2864.5947666195193,
        "Safflower": 4264.505903398926,
        "Sesamum(Sesame,Gingelly,Til)": 12742.966799844957,
        "Soyabean": 4520.53537001884,
        "Sugarcane": 451.3089005235602,
        "Sunflower": 4629.804413094593,
        "Tomato": 2686.974247221581,
        "Wheat": 2504.0725780164885
    };

    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const apiEndpoint = 'http://127.0.0.1:5000/predict';

    // Fetch crop prediction from the API
    const fetchCropPrediction = async (crop) => {
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    commodity: crop.commodity,
                    district: crop.district,
                    market_name: crop.market_name,
                    start_date: new Date().toISOString().split('T')[0],
                    end_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                })
            });

            if (!response.ok) throw new Error('Failed to fetch prediction data');
            return await response.json();
        } catch (error) {
            console.error('Error fetching crop prediction:', error);
            return null;
        }
    };

    // Populate the table
    const populateTable = async () => {
        const cropsWithIntervention = [];
        const cropsWithoutIntervention = [];

        for (const crop of cropsData) {
            const prediction = await fetchCropPrediction(crop);
            let notification = 'No Action Needed';

            if (prediction && prediction.error) {
                notification = `<span class="notification">Error: ${prediction.error}</span>`;
            } else if (prediction) {
                const modalPrice = prediction[0]?.["Modal Price"];
                const averageModalPrice = modalPrices[crop.commodity];

                if (modalPrice > averageModalPrice * 1.2) {
                    notification = `<span class="notification">Stock Intervention Required</span>`;
                    cropsWithIntervention.push({ crop, notification });
                    continue;
                }
            }

            cropsWithoutIntervention.push({ crop, notification });
        }

        setTableData([...cropsWithIntervention, ...cropsWithoutIntervention]);
    };

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Format today's date
    useEffect(() => {
        const date = new Date().toLocaleDateString();
        setCurrentDate(`Today's Date: ${date}`);
    }, []);

    // Populate table on component mount
    useEffect(() => {
        populateTable();
    }, []);

    // Filter table data based on search term
    const filteredData = tableData.filter(({ crop }) =>
        crop.commodity.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container">
            <header>
                <h1>Crop Price Notification</h1>
            </header>
            <h2>{currentDate}</h2>
            <div className="special-table-container">
                <input
                    type="search"
                    id="search"
                    placeholder="Search for commodities..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Commodity</th>
                            <th>Notification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(({ crop, notification }, index) => (
                            <tr key={index}>
                                <td>{crop.commodity}</td>
                                <td dangerouslySetInnerHTML={{ __html: notification }} />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BufferStock;
