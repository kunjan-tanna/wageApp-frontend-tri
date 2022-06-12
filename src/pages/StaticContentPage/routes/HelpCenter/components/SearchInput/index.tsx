import React, { createRef, FC } from 'react';

import { IProps } from './types';

import Input from '../../../../../../components/InputFieldAlternative';

import './styles.scss';

const SearchInput: FC<IProps> = ({ placeholder, handleSubmit }) => {

  const textInput = createRef<HTMLInputElement>();

  return (
    <div className="faq__search">
      <form className="faq__search__form">
        <Input placeholder={placeholder} externalRef={textInput} />
        {/*<input className="faq__search__input" type="text" placeholder={placeholder} ref={textInput} />*/}
        <button className="faq__search__submit btn btn--b btn--b-color" onClick={ev => {
          ev.preventDefault();
          // @ts-ignore
          handleSubmit(textInput.current.value);
        }}>
          Search
        </button>
      </form>
    </div>
  );
};


export default SearchInput;