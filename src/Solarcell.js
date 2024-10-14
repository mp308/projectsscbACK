import React from 'react';
import './Solarcell.css';

const portfolioItems = [
  {
    id: 1,
    title: 'โครงการ Solar 1',
    client: 'ธนกฤต กรุ๊ป จำกัด',
    location: 'จ.นนทบุรี',
    imageUrl: 'ลิงก์ไปยังรูปภาพ1',
  },
  {
    id: 2,
    title: 'โครงการ Solar 2',
    client: 'ลูกค้ารายที่ 2',
    location: 'จ.กรุงเทพ',
    imageUrl: 'ลิงก์ไปยังรูปภาพ2',
  },
  // เพิ่มรายการเพิ่มเติมตามต้องการ
];

const Solarcell = () => {
  return (
    <div className="solarcell-container">
      <h1>คุณสมบัติของพลังงานแสงอาทิตย์</h1>
      <p>
        พลังงานแสงอาทิตย์และโซลาร์เซลล์มีความยั่งยืน ใช้งานได้ระยะยาว
        เป็นพลังงานที่ไม่มีวันหมด ลดค่าไฟให้ธุรกิจของคุณ...
      </p>

      <h2>ผลงานโครงการ Solar Cell</h2>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <div key={item.id} className="portfolio-item">
            <img src={item.imageUrl} alt={item.title} />
            <h3>{item.title}</h3>
            <p>ลูกค้า: {item.client}</p>
            <p>สถานที่: {item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solarcell;
