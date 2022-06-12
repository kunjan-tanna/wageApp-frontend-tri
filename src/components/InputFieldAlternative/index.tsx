import React, {Component} from 'react';

import './styles.scss';

class InputFieldAlternative extends Component<any> {
  public render() {
    const { externalRef, className, ...inputProps } = this.props;
  
    return (
      <div className="inputFieldAlternative">
        <input className={['inputFieldAlternative__input', className].filter((name: string) => (name!!)).join(' ')} {...inputProps} ref={externalRef ? externalRef : null} />
        <div className="inputFieldAlternative__placeholder">{inputProps.placeholder}</div>
      </div>
    );
  }
}

export default InputFieldAlternative;
