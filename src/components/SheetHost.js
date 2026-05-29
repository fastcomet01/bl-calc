import React from 'react';
import { useUI } from '../ui';
import Sheet from './Sheet';
import AddSheet from '../sheets/AddSheet';
import BudgetSheet from '../sheets/BudgetSheet';
import AccountSheet from '../sheets/AccountSheet';
import TimePickerSheet from '../sheets/TimePickerSheet';

const TITLES = {
  add: 'Add Expense',
  budget: 'Daily Budget',
  account: 'Account',
  timepicker: 'Pick a time',
};

export default function SheetHost() {
  const { sheet, closeSheet } = useUI();
  const name = sheet?.name;
  const props = sheet?.props || {};

  let body = null;
  switch (name) {
    case 'add':        body = <AddSheet {...props} />; break;
    case 'budget':     body = <BudgetSheet />; break;
    case 'account':    body = <AccountSheet />; break;
    case 'timepicker': body = <TimePickerSheet {...props} />; break;
  }

  return (
    <Sheet visible={!!name} title={TITLES[name] || ''} onClose={closeSheet}>
      {body}
    </Sheet>
  );
}
