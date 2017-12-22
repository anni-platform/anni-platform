import React from 'react';
import Downshift from 'downshift';
import { Input, SelectOption, Select as StyledSelect, SelectOptions } from "styled";

export function Select({items, onChange, placeholder = 'Select an option...', defaultSelectedItem}) {
  return (
    <Downshift
      onChange={onChange}
      defaultSelectedItem={defaultSelectedItem}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
        reset,
      }) => {
        const filteredItems = items.filter(i =>
          !inputValue || inputValue === selectedItem || i.toLowerCase().includes(inputValue.toLowerCase()));
        return (
          <div>
            <StyledSelect hasItems={!!filteredItems.length}>
              <Input
                select {...getInputProps({ placeholder })}
                onFocus={inputValue === selectedItem && toggleMenu}
              />
              {isOpen ? (
                <SelectOptions>
                  {filteredItems
                    .map((item, index) => (
                      
                        <SelectOption
                          active={highlightedIndex === index || selectedItem === item}
                          {...getItemProps({item})}
                          key={item}
                        >
                          {item}
                        </SelectOption>
                    ))}
                </SelectOptions>
              ) : null}
            </StyledSelect>
          </div>
        );
      }}
    />
  )
}