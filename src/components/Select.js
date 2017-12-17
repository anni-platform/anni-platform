import React from 'react';
import Downshift from 'downshift';
import { Input, SelectOption, Select as StyledSelect } from "styled";

export function Select({items, onChange, placeholder = 'Select an option...'}) {
  return (
    <Downshift
      onChange={onChange}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => {
        const filteredItems = items.filter(i =>
          !inputValue || i.toLowerCase().includes(inputValue.toLowerCase()));
        return (
          <div>
            <StyledSelect hasItems={!!filteredItems.length}>
              <Input select {...getInputProps({ placeholder })} />
              {isOpen ? (
                <div>
                  {filteredItems
                    .map((item, index) => (
                      <div
                        {...getItemProps({item})}
                        key={item}
                      >
                        <SelectOption active={highlightedIndex === index}>
                          {item}
                        </SelectOption>
                      </div>
                    ))}
                </div>
              ) : null}
            </StyledSelect>
          </div>
        );
      }}
    />
  )
}