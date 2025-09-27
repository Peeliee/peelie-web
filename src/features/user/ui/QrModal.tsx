import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/common/dialog';
import { QRCodeSVG } from 'qrcode.react';

type QrModalProps = {
  url: string;
  triggerLabel: string;
  title: string;
  description: string;
  tagText: string;
  userName: string;
};

export function QrModal({
  url,
  triggerLabel,
  title,
  description,
  tagText,
  userName,
}: QrModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`
            w-full rounded-3xl py-3 font-medium
            bg-orange-400
          `}
        >
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px] overflow-hidden p-0">
        <div className="bg-[linear-gradient(180deg,#F98A2B_0%,#FFB24D_100%)] p-6 sm:p-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-extrabold tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm leading-6">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex items-center justify-center">
            <div className="bg-white rounded-md p-3 shadow">
              <QRCodeSVG value={url} size={220} />
            </div>
          </div>

          <div className="mt-6">
            <div className="mx-auto w-full max-w-[320px] rounded-2xl bg-white text-foreground p-4 sm:p-5 shadow">
              <div className="text-muted-foreground text-sm">{tagText}</div>
              <div className="mt-1 text-2xl font-extrabold">{userName}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
