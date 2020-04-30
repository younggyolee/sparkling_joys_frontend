import React, { useState, useEffect } from 'react';

function SelectCurrency(onCurrencySelect: Function) {
  return (
    <div>
      <select>
        <option>USD</option>
      </select>
    </div>
  )
}

export default SelectCurrency;
