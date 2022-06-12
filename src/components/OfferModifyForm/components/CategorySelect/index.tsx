import './styles.scss';

import classnames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { Actions, categoriesRequest } from '../../../../modules/Categories/actions';
import { categoriesSelectSelector } from '../../../../modules/Categories/selectors';
import { IStoreState } from '../../../../store';
import { IExternalProps } from './types';
import { IDispatchProps, IProps, ISelectValue } from './types';

class CategorySelect extends Component<IProps> {
  public componentDidMount(): void {
    const { getCategories } = this.props;

    getCategories();
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { categories, value, defaultCategoryName } = this.props;

    if (!value && defaultCategoryName) {
      const defaultValue = categories.find(cat => cat.label.indexOf(defaultCategoryName) > -1);

      if (defaultValue) {
        this._setValue(defaultValue);
      }
    }
  }

  public render() {
    const { categories, error, touched, value } = this.props;
    const currentCategory =
      value && categories ? categories.find(item => item.value === value) : '';
    const visibleError = error && touched;
    const selectClassnames = classnames('category-select', {
      'category-select--has-value': value,
      'category-select--error': visibleError
    });

    return (
      <div className={selectClassnames}>
        <Select
          value={
            value && currentCategory
              ? {
                  value,
                  label: currentCategory.label
                }
              : null
          }
          // @ts-ignore
          onChange={this._setValue}
          options={this._getOptions()}
          className={'select-dropdown'}
          classNamePrefix={'dropdown-content'}
          placeholder="Category"
        />

        {visibleError && <div className="validation-error">{error}</div>}
      </div>
    );
  }

  private _setValue = (value: ISelectValue) => {
    const { setFieldValue } = this.props;

    return setFieldValue('categoryId', value.value);
  };

  private _getOptions = (): ISelectValue[] => {
    const { categories } = this.props;
    const categoriesWithoutAll = categories.filter(item => item.value !== 0);

    return categoriesWithoutAll.map(({ value, label }) => ({
      value,
      label
    }));
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    categories: categoriesSelectSelector(state.categories)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        getCategories: categoriesRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(CategorySelect);
