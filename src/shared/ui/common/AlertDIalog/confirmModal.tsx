import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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

// Confirm
function Confirm({ children, className, onClick, ...rest }: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    // AlertDialogAction의 기본 동작(모달 닫기)을 막지 않음
  };

  return (
    <AlertDialogAction
      className={cn("min-w-[96px] bg-blue-500 text-white hover:bg-blue-600", className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </AlertDialogAction>
  );
}
  

// Footer
function Footer({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <AlertDialogFooter className={cn("w-full flex gap-2 justify-end", className)}>
        {children}
      </AlertDialogFooter>
    );
}
  
  // Cancel
function Cancel({ children, className, onClick, ...rest }: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    // AlertDialogCancel의 기본 동작(모달 닫기)을 막지 않음
  };

  return (
    <AlertDialogCancel
      className={cn("min-w-[96px] bg-gray-200 text-gray-700 hover:bg-gray-300", className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </AlertDialogCancel>
  );
}

export const ConfirmModal = Object.assign(Root, {
  Trigger,
  Content,
  Header,
  Title,
  Description,
  Footer,
  Cancel,
  Confirm,
})