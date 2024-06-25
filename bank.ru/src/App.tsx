import React, { useState, useEffect } from 'react';
import "./App.css";
import "./index.css";
import triagleApp from "./assets/triangle.svg";



interface Bank {
  name: string;
  logo: string;
  amount: number;
}

const data = {
  "filter": {
    "amount": null
  },
  "products": [{
    "amount": 1000,
    "name": "Т-банк",
    "logo": "//static3.banki.ru/ugc/d4/e8/54/40/195706.png"
  },{
    "amount": 10000,
    "name": "ВТБ",
    "logo": "//static4.banki.ru/ugc/ed/5f/1a/1c/327.png"
  },{
    "amount": 20000,
    "name": "Почта Банк",
    "logo": "//static2.banki.ru/ugc/c3/64/dd/70/194275.png"
  },{
    "amount": 20000,
    "name": "Локо-Банк",
    "logo": "//static3.banki.ru/ugc/1a/05/5b/45/9183.png"
  },{
    "amount": 1000000,
    "name": "Сбербанк",
    "logo": "//static4.banki.ru/ugc/9d/12/0b/81/322.png"
  }]
};

const App: React.FC = () => {
  const [creditSum, setCreditSum] = useState<number | null>(null);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>(data.products);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  useEffect(() => {
    handleFilter();
  }, [creditSum]);

  // изменение в поле ввода суммы кредита
  const handleCreditSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCreditSum(value !== '' ? Number(value) : null);
  };

//фильлтор банков по сумме 
  const handleFilter = () => {
    if (creditSum !== null) {
      const filtered = data.products.filter((bank) => bank.amount <= creditSum);
      setFilteredBanks(filtered);
    } else {
      setFilteredBanks(data.products);
    }
  };

  // сортировка по макс или по мин сумме
  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = [...filteredBanks].sort((a, b) => 
      order === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );
    setFilteredBanks(sorted);
    setSortOrder(order);
    setShowSortMenu(false); // Скрыть меню после выбора сортировки
  };

  // показывает меню сортировки
  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  return (
    <div className='main'>
      <div className='main__search'>
        <input 
          className='search__creditSum'
          type="text"
          value={creditSum !== null ? creditSum : ''}
          onChange={handleCreditSumChange}
          placeholder='Сумма кредита'
        />
      </div>
      <div className='sort_container'>
        <button className='btn__sort' onClick={toggleSortMenu}>
          Сортировать
          <div>
             <img src={triagleApp} alt="trialge" />
          <img className='triagleDown' src={triagleApp} alt="trialge" />
          </div>
         
        </button>
        {showSortMenu && (
          <div className='sort__menu'>
            <div onClick={() => handleSort('desc')}>По максимальной сумме</div>
            <div onClick={() => handleSort('asc')}>По минимальной сумме</div>
          </div>
        )}
      </div>
      <div className='banki__container'>
        <ul>
          {filteredBanks.map((bank) => (
            <li className='banki-list' key={bank.name}>
              <div className='banki'>
                <img src={bank.logo} alt={bank.name} />
                <p>
                  {bank.name} 
                </p>
             
              </div>
              <div className='sum'>
                 Сумма
              </div>
              <div className='amount'>
             <b>
              {bank.amount.toLocaleString('ru-RU')} ₽
              </b> 
         
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

