import React from 'react';
import Downshift from 'downshift';
import {
  Input,
  SelectOption,
  Select as StyledSelect,
  SelectOptions,
  SolidIcon,
  Subheading,
} from 'styled';

export function Select({
  className,
  items,
  label,
  onChange,
  placeholder = 'Select an option...',
  defaultSelectedItem,
}) {
  return (
    <Downshift
      onChange={onChange}
      defaultSelectedItem={defaultSelectedItem}
      itemToString={item => (item ? item.label : '')}
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
        const currentFilter = (inputValue && inputValue.toLowerCase()) || '';
        const filteredItems = items.filter(
          ({ value }) =>
            !value ||
            value === selectedItem ||
            value.toLowerCase().includes(currentFilter)
        );
        return (
          <div>
            <StyledSelect
              hasItems={!!filteredItems.length}
              rotateIcon={isOpen}
              className={className}
            >
              {label && <Subheading micro>{label}</Subheading>}
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
                      key={item.value}
                    >
                      {item.label}
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
