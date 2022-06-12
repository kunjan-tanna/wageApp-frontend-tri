import { ISendMessagePayload } from '../../../../../../modules/Chat/types/signalr';

export interface IProps {
  sendMessage: (payload: ISendMessagePayload) => void;
  offerId: number;
  recipientId: string;
  blocked: boolean;
  blockedMessage: string;
  deleted: boolean;
}

export interface IImageFile {
  base64: string | ArrayBuffer;
  fileName: string;
}
