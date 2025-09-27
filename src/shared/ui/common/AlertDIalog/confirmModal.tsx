import * as React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/shared/ui/common/alert-dialog"

import { cn } from "@/shared/lib/utils"

// ✅ Root props 인터페이스
export interface ConfirmModalProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

// Root
function Root({ children, open, onOpenChange }: ConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </AlertDialog>
  );
}

// Trigger
function Trigger({ children }: { children: React.ReactNode }) {
  return <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>;
}

// Content
function Content({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <AlertDialogContent
      className={cn(
        "flex w-[308px] h-[147px] flex-col justify-center items-center gap-[30px] shrink-0 rounded-2xl",
        className
      )}
    >
      {children}
    </AlertDialogContent>
  );
}

// Header
function Header({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogHeader className={cn(className)}>
      {children}
    </AlertDialogHeader>
  );
}

// Title
function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogTitle className={cn(className)}>
      {children}
    </AlertDialogTitle>
  );
}

// Description
function Description({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AlertDialogDescription className={cn(className)}>
      {children}
    </AlertDialogDescription>
  );
}

// Footer
function Footer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <AlertDialogFooter className={cn("w-full flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}>
        {/* 모바일: flex-col-reverse로 세로 배치, 취소가 아래 , 데스크톱: sm:flex-row sm:justify-end로 가로 배치, 오른쪽 정렬
       */}
        {children}
      </AlertDialogFooter>
    );
}

export const ConfirmModal = Object.assign(Root, {
  Trigger,
  Content,
  Header,
  Title,
  Description,
  Footer,
})