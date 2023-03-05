import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

 

function App() {
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [amount, setAmount] = useState(1)
 const [currencyOptions, setCurrencyOptions] = useState([])
 const [result, setResult] = useState()

 let  inFromAmount,fromAmount, toAmount

 if(inFromAmount){
  fromAmount = amount;
  toAmount = result
 }
 else{
  toAmount = amount;
  fromAmount = result
  
 }


  
useEffect(() => {
  var myHeaders = new Headers();
myHeaders.append("apikey", "ciHxmNXuYTjzQNEthxKMcpXB1UBCiOyU");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch(`https://api.apilayer.com/exchangerates_data/v1/latest`, requestOptions)
  .then(response => response.json())
  .then(result => {
    
    const firstCurrency = Object.keys(result.rates)[0]
    setCurrencyOptions([result.base, ...Object.keys(result.rates)])
    setFromCurrency(result.base)
    setToCurrency(firstCurrency) 
  });
},[])

useEffect(() => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "ciHxmNXuYTjzQNEthxKMcpXB1UBCiOyU");
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      setResult(data.result)
    });
},[toCurrency, fromCurrency, amount])

function handleFromAmount(e){
  inFromAmount=true
 setAmount(e.target.value)
}

function handleToAmount(e){
  inFromAmount = false
  setAmount(e.target.value)
}

  return (
  <>
    <h1>Hello World</h1>
    <CurrencyRow
    currencyOptions = {currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeAmount={handleFromAmount}
    amount={toAmount}
    onChangeCurrency = {e => setFromCurrency(e.target.value )}
    />
    <div class='equals'>=</div>
    <CurrencyRow 
    currencyOptions = {currencyOptions}
    selectedCurrency={toCurrency}
    onChangeAmount={handleToAmount}
    amount={fromAmount}
    onChangeCurrency = {e => setToCurrency(e.target.value )}
    />
  </>
  );
}

export default App;


