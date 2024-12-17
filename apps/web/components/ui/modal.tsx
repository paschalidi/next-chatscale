'use client';
import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import Image from 'next/image';


export interface ModalProps extends Dialog.DialogProps {
  isOpen: boolean;
  titleActionNode?: ReactNode;
  title?: string | ReactNode;
  withNoTitle?: boolean;
  customTitle?: ReactNode;
  size?: 'md' | 'lg';
  gutter?: '1' | '2' | '3';
  isDismissible?: boolean;
  hideCloseButton?: boolean;
  children: ReactNode;
  contentClassName?: string;
  isFullHeight?: boolean;
  onBackRequest?: () => void;
  onCloseRequest: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => unknown;
}

export const Modal = ({
                        isOpen,
                        title,
                        withNoTitle = false,
                        size = 'md',
                        children,
                        gutter = '2',
                        isFullHeight = false,
                        customTitle,
                        onBackRequest,
                        onCloseRequest,
                        contentClassName,
                        hideCloseButton = false,
                        isDismissible = false
                      }: ModalProps) => {


  const renderTitle = () => {
    if (withNoTitle) {
      return null;
    }
    if (customTitle) {
      return (
        <Dialog.Title
          className={clsx(
            'sticky top-0 z-10 bg-transparent flex flex-row justify-between gap-4',
            {
              'md:p-7': gutter === '3',
              'md:p-5': gutter === '2'
            }
          )}
        >
          {customTitle}
        </Dialog.Title>
      );
    }

    return null;
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>

        <Dialog.Overlay
          onClick={event => event.stopPropagation()}
          style={{ zIndex: 100 }}
          className="bg-neutral-900 data-[state=open]:animate-overlayShow fixed inset-0 opacity-75 w-screen h-screen top-0"
        />
        <Dialog.Content
          onClick={event => event.stopPropagation()}
          style={{ zIndex: 100 }}
          className={clsx(
            'flex flex-col gap-md data-[state=open]:animate-contentShow fixed bottom-0 md:bottom-auto md:top-[50%] left-[50%] w-full md:w-[90vw] translate-x-[-50%] md:translate-y-[-50%] focus:outline-none overflow-y-auto',
            {
              'min-h-[95dvh] max-h-[calc(100dvh-12px)] md:h-auto':
              isFullHeight,
              'min-h-[95dvh] max-h-[100dvh] md:h-auto':
              isFullHeight,
              'h-[90dvh] md:h-auto': !isFullHeight,
              'md:max-w-[540px]': size === 'md',
              'md:max-w-[747px]': size === 'lg'
            }
          )}
        >
          <div
            className={clsx(
              'flex flex-col h-full md:h-auto bg-white shadow-6 max-h-[90vh]',
              {
                'rounded-t-lg md:rounded-lg': !isFullHeight
              }
            )}
          >
            {isDismissible && (
              <div className="flex flex-row h-4 items-center justify-center py-4">
                <Image
                  priority
                  width={40}
                  height={6.8}
                  src={'/svg2/down-menu.svg'}
                  alt={'image'}
                  className={'pointer-events-none'}
                />
              </div>
            )}
            {!customTitle && !withNoTitle && (
              <Dialog.Title
                className={clsx(
                  'p-5 flex flex-row justify-between gap-4 border-b',
                  {
                    'md:p-7': gutter === '3',
                    'md:p-5': gutter === '2'
                  }
                )}
              >
                <h1 className={'font-medium text-2xl'}>
                  {title}
                </h1>

              </Dialog.Title>
            )}

            <div
              className={clsx(
                'overflow-y-auto h-full md:h-auto',
                contentClassName,
                {
                  'px-5 pb-5': !contentClassName,
                  'md:px-7 md:pb-7': gutter === '3' && !contentClassName,
                  'md:px-5 md:pb-5': gutter === '2' && !contentClassName,
                  'pt-5 md:pt-7': !title && !contentClassName
                }
              )}
            >
              {renderTitle()}
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
