import React from 'react'

export default function CurrencyRow({currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount}) {
  return (
    <div>
      <input type='number' class="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {  
        currencyOptions.map(currency => 
          <option  value={currency}>{currency}</option>
        )}
      </select>
    </div>
  )
}




