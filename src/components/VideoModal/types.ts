import { VideoTypes } from './video-types';

export interface IProps {
  closeModal: () => void;
  isOpen: boolean;
  videoUrl: string;
  videoType: VideoTypes
}
