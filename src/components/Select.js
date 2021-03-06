import React from 'react';
import Downshift from 'downshift';
import {
  Input,
  SelectOption,
  Select as StyledSelect,
  SelectOptions,
  SolidIcon,
} from 'styled';

export function Select({
  items,
  onChange,
  placeholder = 'Select an option...',
}) {
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
        toggleMenu,
      }) => {
        const filteredItems = items.filter(
          i =>
            !inputValue ||
            inputValue === selectedItem ||
            i.toLowerCase().includes(inputValue.toLowerCase())
        );
        return (
          <div>
            <StyledSelect hasItems={!!filteredItems.length} rotateIcon={isOpen}>
              <Input
                select
                {...getInputProps({ placeholder })}
                onFocus={toggleMenu}
              />
              <SolidIcon name="chevron-down" size={20} />
              {isOpen ? (
                <SelectOptions>
                  {filteredItems.map((item, index) => (
                    <SelectOption
                      active={
                        highlightedIndex === index || selectedItem === item
                      }
                      {...getItemProps({ item })}
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
  );
}
