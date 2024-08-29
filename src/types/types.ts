export type UrlData = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export type UrlState = {
  urls: UrlData[];
  loading: boolean;
  error: string | null;
};

export type CardViewProps = {
  urls: UrlData[];
  expandedRows: { [key: string]: boolean };
  handleExpand: (id: string) => void;
  handleStatusChange: (id: string, status: string) => void;
  onEdit?: (shortUrl: string) => void;
  onDelete?: (id: string) => void;
  handleCopyToClipboard: (url: string) => void;
};
export type UrlCardProps = {
  urls: UrlData[];
  expandedRows: { [key: string]: boolean };
  handleExpand: (id: string) => void;
  handleStatusChange: (id: string, status: string) => void;
  handleCopyToClipboard: (url: string) => void;
};

export type URLTableProps = {
  urls: UrlData[];
  handleStatusChange: (id: string, status: string) => void;
  onEdit?: (shortUrl: string) => void;
  onDelete?: (id: string) => void;
  handleCopyToClipboard: (url: string) => void;
  loading: boolean;
};

export type URLProps = {
  urls: UrlData[];
  handleStatusChange: (id: string, status: string) => void;
  handleCopyToClipboard: (url: string) => void;
  loading: boolean;
};

export type HeaderProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
};
export type InputsProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
};
export type UrlFormProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  remainingLinks: number;
};
export type ShortenUrlFormProps = {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
};

export type UpdateProfileClientProps = {
  firstImageSrc: string;
  secondImageSrc: string;
};

export type ProfileState = {
  name: string;
  email: string;
};

export type EditUrlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newUrl: string) => void;
  currentUrl: string;
};
export type UrlWithFaviconProps = {
  url: string;
};

export type AuthState = {
  name: string;
  email: string;

  passwords: {
    password: string;
    confirmPassword: string;
  };
  loading: boolean;
  isAuthenticated: boolean;

  success: boolean;
  error: string | null;
};

export type AxiosError = {
  response?: {
    data: string;
  };
  message: string;
};
export type CustomSlugState = {
  originalUrl: string;
  customSlug: string;
  shortUrl: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type ProfileStates = {
  name: string;
  email: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type UrlStatusState = {
  loading: boolean;
  error: string | null;
};

export type ChangePasswordState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

export type ForgotPasswordState = {
  email: string;
  loading: boolean;
  success: boolean;
  error: string | null;
};

export interface InputField {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export interface Passwords {
  password: string;
  confirmPassword: string;
}
import React, { ChangeEvent } from "react";
export type InputFieldProps = {
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};
