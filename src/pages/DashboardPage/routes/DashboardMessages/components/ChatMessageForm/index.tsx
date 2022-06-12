import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import generateUUID from 'uuid/v4';

import {
  dropzoneImagesTypes,
  getDropzoneImagesTypes
} from '../../../../../../data/static/dropzone-image-types';
import { MessageType, MessageTypes } from '../../../../../../modules/Chat/types';
import { ISendMessagePayload } from '../../../../../../modules/Chat/types/signalr';
import { Nullable } from '../../../../../../types';
import { IImageFile, IProps } from './types';

import './styles.scss';

const ChatMessageForm = ({
  sendMessage,
  offerId,
  recipientId,
  blocked,
  blockedMessage,
  deleted
}: IProps) => {
  const [message, _setMessage] = useState<string>('');
  const [image, _setImage] = useState<Nullable<IImageFile>>(null);
  const [file, setFile] = useState();

  const send = () => {
    if (blocked) {
      return;
    }

    if (message.trim().length > 0) {
      _sendMessage(sendMessage, offerId, recipientId, message, null, MessageTypes.TEXT, file, () =>
        _setMessage('')
      );
    }

    if (image) {
      _sendMessage(
        sendMessage,
        offerId,
        recipientId,
        image.base64.toString(),
        image,
        MessageTypes.IMAGE,
        file,
        () => _setImage(null)
      );
    }
  };

  const pressKeyDown = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      send();
    }
    // keyEvent.preventDefault();
  };
  return (
    <form
      className="chat__message-form"
      onSubmit={ev => {
        ev.preventDefault();

        if (blocked) {
          return;
        }

        if (message.trim().length > 0) {
          _sendMessage(
            sendMessage,
            offerId,
            recipientId,
            message,
            null,
            MessageTypes.TEXT,
            file,
            () => _setMessage('')
          );
        }

        if (image) {
          _sendMessage(
            sendMessage,
            offerId,
            recipientId,
            image.base64.toString(),
            image,
            MessageTypes.IMAGE,
            file,
            () => _setImage(null)
          );
        }
      }}
    >
      {/* <input
        placeholder={blocked ? blockedMessage : 'Type something'}
        value={message}
        className="chatTextArea"
        onChange={ev => _setMessage(ev.target.value)}
        disabled={blocked}
      /> */}
      {image
        ? _renderImage(image, _setImage)
        : !blocked && (
            <Dropzone
              accept={getDropzoneImagesTypes()}
              multiple={false}
              onDrop={files => _onDrop(files, _setImage, setFile)}
              onDropRejected={_onDropRejected}
            >
              {({ getInputProps }) => (
                <div className="image-upload">
                  <label htmlFor="image">
                    <i className="icon icon--photo-color" />
                    <input id="image" {...getInputProps()} />
                  </label>
                </div>
              )}
            </Dropzone>
          )}
      <textarea
        placeholder={blocked ? blockedMessage : 'Type something'}
        value={message}
        className="chatTextArea"
        onKeyDown={pressKeyDown}
        onChange={ev => _setMessage(ev.target.value)}
        disabled={blocked || deleted}
      />

      {/* <textarea
      placeholder={blocked ? blockedMessage : 'Type something'}
      value={message}
      className="chatTextArea"
      onKeyDown={pressKeyDown}
      onChange={ev => _setMessage(ev.target.value)}
      disabled={blocked}
    /> */}
      {/* <div>
      <i className="fa fa-paper-plane" aria-hidden="true" onClick={() => send()}></i>
    </div> */}
    </form>
  );
};

const _sendMessage = (
  sendMessage: (payload: ISendMessagePayload) => void,
  offerId: number,
  recipientId: string,
  message: string,
  image: Nullable<IImageFile>,
  type: MessageType,
  file: any,
  clearCallback: () => void
) => {
  clearCallback();

  return sendMessage({
    OfferId: offerId,
    RecipientId: recipientId,
    MessageContentType: type,
    Message: message,
    Image: image ? image.base64.toString() : '',
    FileName: image ? image.fileName.trim() : '',
    TempId: generateUUID(),
    file: file
  });
};

const _onDrop = (
  acceptedFiles: File[],
  setImage: (image: IImageFile) => void,
  setFile: (file: any) => void
) => {
  if (acceptedFiles.length > 0) {
    const reader = new FileReader();
    const file = acceptedFiles[0];
    console.log('\n\n\n UIUIUI', file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setImage({
          base64: reader.result,
          fileName: file.name
        });

        setFile(file);

        // setImage(file)
      }
    };
  }
};

const _onDropRejected = (rejectedFiles: File[]) => {
  rejectedFiles.map(item => {
    if (!dropzoneImagesTypes.includes(item.type)) {
      return alert('Unavailable extension!');
    } else {
      return alert('File rejected.');
    }
  });
};

const _renderImage = (image: IImageFile, setImage: (image: Nullable<IImageFile>) => void) => {
  return (
    <div className="loaded-image">
      <button
        type="button"
        className="remove-btn"
        title="Remove image"
        onClick={() => setImage(null)}
      >
        <i className="icon icon--close-gray" />
      </button>
      <img src={image.base64.toString()} alt="" />
    </div>
  );
};

export default ChatMessageForm;
