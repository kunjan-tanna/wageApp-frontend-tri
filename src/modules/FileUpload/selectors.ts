import {IFileUploadStoreState, ISingleFile} from './types';

export const selectAllUploadedFiles = (state: IFileUploadStoreState): ISingleFile[] => {
  return state.offerForm.files;
};

export const selectReadyUploadedFiles = (state: IFileUploadStoreState): ISingleFile[] => {
  return selectAllUploadedFiles(state).filter(item => item.data && !item.error && !item.requesting);
};