import React, { Component, ComponentClass } from 'react';

import { IState, IStateObjectSignature, TModal } from './types';

const withModal = (PageComponent: ComponentClass<any>, modals: TModal) => {
  class ModalHOC extends Component<any, IState> {
    public constructor(props: any) {
      super(props);

      const visibility: IStateObjectSignature<boolean> = {};
      const modalState: IStateObjectSignature<any> = {};
      const components: IStateObjectSignature<ComponentClass<any>> = {};

      modals.forEach(modal => {
        if (typeof modal === 'string') {
          const modalName = modal.toLowerCase();
          visibility[modalName] = false;
          modalState[modalName] = undefined;
        } else {
          const { name, visible, state } = modal;
          const modalName = name.toLowerCase();
          visibility[modalName] = !!visible;
          modalState[modalName] = state;
        }
      });

      this.state = {
        visibility,
        state: modalState,
        components
      };
    }

    public render() {
      return (
        <PageComponent
          {...this.props}
          render={Math.random()}
          openModal={this._handleOpenModal}
          closeModal={this._handleCloseModal}
          toggleModal={this._handleToggleModal}
          getModalState={this._getModalState}
          setModalState={this._setModalState}
          getModalVisibility={this._getModalVisibility}
        />
      );
    }

    private _getModalVisibility = (modal: string): any => {
      const modalName = modal.toLowerCase();

      return this.state.visibility[modalName];
    };

    private _getModalState = (modal: string): any => {
      const modalName = modal.toLowerCase();

      return this.state.state[modalName];
    };

    private _setModalState = (modal: string, state: any) => () => {
      const modalName = modal.toLowerCase();
      this.setState({
        state: {
          ...this.state.state,
          [modalName]: state
        }
      });
    };

    private _handleOpenModal = (modal: string) => () => {
      const modalName = modal.toLowerCase();

      if (this.state.visibility[modalName]) {
        return;
      }

      this.setState({
        visibility: {
          ...this.state.visibility,
          [modalName]: true
        }
      });
    };

    private _handleCloseModal = (modal: string) => () => {
      const modalName = modal.toLowerCase();

      if (!this.state.visibility[modalName]) {
        return;
      }

      this.setState({
        visibility: {
          ...this.state.visibility,
          [modalName]: false
        }
      });
    };

    private _handleToggleModal = (modal: string) => () => {
      const modalName = modal.toLowerCase();

      this.setState({
        visibility: {
          ...this.state.visibility,
          [modalName]: !this.state.visibility[modalName]
        }
      });
    };
  }

  return ModalHOC;
};

export default withModal;
