import { ComponentClass } from 'react';

export interface IWithModalProps {
  openModal: (name: string) => () => void;
  closeModal: (name: string) => () => void;
  toggleModal: (name: string) => () => void;
  getModalState: (name: string) => any;
  setModalState: (name: string, state: any) => () => void;
  getModalVisibility: (name: string) => boolean;
  responseStatus: number;
};

export interface IStateObjectSignature<T> {
  [key: string]: T;
};

export interface IState {
  visibility: IStateObjectSignature<boolean>;
  state: IStateObjectSignature<any>;
  components: IStateObjectSignature<ComponentClass<any>>;
};

export interface IModal {
  name: string;
  visible?: boolean;
  state?: any;
}

export type TModal = Array<string | IModal>;
