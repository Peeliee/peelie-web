import React, { type ComponentProps, type ReactElement } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/common/alert-dialog';
import { Button } from '../button';
import { cn } from '@/shared/lib/utils';

export interface ModalWrapperProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Root({ children, open, onOpenChange }: ModalWrapperProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </AlertDialog>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  return <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>;
}

function Content({ className, children }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogContent
      className={cn(
        'flex w-[308px] flex-col items-center justify-center gap-5 rounded-2xl p-6 text-center',
        'bg-white shadow-lg',
        className,
      )}
    >
      {children}
    </AlertDialogContent>
  );
}

function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogHeader className={cn('flex flex-col items-center gap-2', className)}>
      {children}
    </AlertDialogHeader>
  );
}

function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogTitle
      className={cn('text-base font-semibold text-gray-900 leading-snug', className)}
    >
      {children}
    </AlertDialogTitle>
  );
}

function Description({ children, className }: { children?: React.ReactNode; className?: string }) {
  if (!children) return null;
  return (
    <AlertDialogDescription className={cn('text-sm text-gray-500 leading-relaxed', className)}>
      {children}
    </AlertDialogDescription>
  );
}

export function QRImage({
  value,
  className,
  size = 220,
}: {
  value: string;
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg bg-white overflow-hidden',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {value ? (
        <QRCodeSVG value={value} size={size - 20} level="M" />
      ) : (
        <div className="text-gray-400 text-sm">QR 데이터 없음</div>
      )}
    </div>
  );
}

function UserInfo({
  nickName,
  label,
  className,
}: {
  nickName: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'w-[260px] flex flex-col items-center justify-center rounded-xl bg-white py-3',
        className,
      )}
    >
      <span className="text-xs text-[#FFA500] mb-1">{label}</span>
      <span className="text-base font-semibold text-gray-900">{nickName}</span>
    </div>
  );
}

function Footer({
  children,
  className,
}: {
  children:
    | ReactElement<ComponentProps<typeof Button>>
    | ReactElement<ComponentProps<typeof Button>>[];
  className?: string;
}) {
  const count = React.Children.count(children);

  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<ComponentProps<typeof Button>>(child)) {
      return React.cloneElement<ComponentProps<typeof Button>>(child, {
        className: cn('flex-1', child.props.className),
      });
    }
    return child;
  });

  return (
    <div
      className={cn(
        'mt-2 flex w-full flex-row gap-2',
        count === 1 ? 'justify-center' : 'justify-between',
        className,
      )}
    >
      {wrappedChildren}
    </div>
  );
}

export const ModalWrapper = Object.assign(Root, {
  Trigger,
  Content,
  Header,
  Title,
  QRImage,
  UserInfo,
  Description,
  Footer,
});
