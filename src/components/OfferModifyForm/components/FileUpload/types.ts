import {
  offerFormFileRemove,
  offerFormUploadRequest
} from '../../../../modules/FileUpload/actions';
import { ISingleFile } from '../../../../modules/FileUpload/types';

export interface IProps extends IDispatchProps, IExternalProps {
  error: string;
  touched?: boolean;
  setFieldValue: (name: string, value: string) => void;
  setFieldTouched: (field: string, isTouched?: boolean) => void;
  textTitle: string;
}

export interface IState {}

export interface IExternalProps {
  allFiles: ISingleFile[];
  readyFiles: ISingleFile[];
}

export interface IDispatchProps {
  removeFile: typeof offerFormFileRemove;
  uploadFile: typeof offerFormUploadRequest;
}
