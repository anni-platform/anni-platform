import React from 'react';
import Downshift from 'downshift';
import { Input, SelectOption, Select as StyledSelect, SelectOptions, SolidIcon, Subheading } from "styled";

export function Select({className, items, label, onChange, placeholder = 'Select an option...', defaultSelectedItem}) {
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
            <StyledSelect hasItems={!!filteredItems.length} rotateIcon={isOpen} className={className}>
              {label && <Subheading micro color>{label}</Subheading>}
              <Input
                select {...getInputProps({ placeholder })}
                onFocus={inputValue === selectedItem && toggleMenu}
              />
              <SolidIcon name="chevron-down" size={20} />
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
